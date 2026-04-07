---
title: "Driving Scenario Detection Pipeline"
slug: "driving-scenario-detection"
year: 2024
period: "2024"
organization: "Matt3r.AI"
subtitle: "An interpretable end-to-end pipeline for front-camera traffic-event detection."
summary: "A scenario-detection system that fuses multiple perception signals with temporal reasoning to detect meaningful driving events."
featured: true
tags: ["Scenario Detection", "Computer Vision", "Tracking", "Temporal Reasoning"]
stack: ["Python", "Deep Learning", "FSMs", "Multi-object Tracking"]
impact: "Produced interpretable event windows and confidence scores from complex perception inputs, enabling downstream labeling and model-development workflows."
cover: "/images/projects/driving-scenario-detection.jpg?v=20260406-scenario"
order: 3
---

# From Front-Camera Footage to Scenario Labels

The `scenario_detection` repository is built around a practical problem in autonomous-driving data operations: raw video is easy to collect, but hard to search, score, and convert into useful scenario examples. If a team wants clips of cut-ins, leading-vehicle slowdowns, jaywalking, or construction scenes, someone has to either watch footage manually or build a system that can turn perception outputs into compact event labels.

That is the job of this repository. It takes front-camera driving footage, fuses multiple perception models, reasons over ego and non-ego motion, and emits structured scenario summaries that can be consumed downstream by a larger Real2Sim, annotation, or triage workflow.

<figure>
  <img
    src="../../images/projects/scenario-detection-pipeline.jpg?v=20260406-scenario-pipeline"
    alt="Scenario Detection pipeline from front-camera inputs through frame sampling, YOLOv10, YOLOPv2, DeepLabV3, Depth Anything V2, ROI filtering, optical flow, lane tracking, object tracking, ego and non-ego temporal reasoning, scenario aggregation, and JSON outputs."
  />
  <figcaption>
    End-to-end scenario-detection pipeline, from front-camera footage through perception, temporal reasoning, scenario aggregation, and final JSON event summaries.
  </figcaption>
</figure>

## The Problem

Driving footage is rich, but unstructured. A 60-second front-camera clip may contain a useful event, but finding it is expensive if the only interface is the video itself. The core challenge is not only detecting objects, but interpreting traffic behavior over time:

- Did the ego vehicle change lanes, cut in, or cut out?
- Did another vehicle enter or leave the ego lane?
- Is a pedestrian crossing legally, or jaywalking?
- Is the scene worth prioritizing because it contains construction or higher-risk traffic behavior?

This repository treats scenario detection as a temporal reasoning problem rather than a pure single-frame perception task. The code does not stop at bounding boxes or segmentation masks. It tries to turn those signals into scenario windows and a compact severity-oriented summary for each clip.

## The Role of This Repository

Inside a larger driving-data stack, this repo plays the role of a scenario-mining and packaging layer.

It sits between raw inputs and downstream consumers:

- Upstream, it accepts front-camera footage from an S3 URI, a local video file, or a directory of pre-extracted frames.
- In the middle, it can either run model inference live, reuse stored model outputs, or consume outputs already loaded in memory.
- Downstream, it produces JSON records containing event names, time windows, an encoded scenario integer, and a weighted score.

That design matters. The repository is not just an inference demo. It is organized to support several operating modes:

- `RUN_MODELS_INFERENCE`: run the perception stack directly on frames.
- `STORED_OUTPUTS`: reload cached detector outputs from disk for faster iteration.
- `OUTPUTS_IN_MEMORY`: accept model outputs that were computed elsewhere.

In practice, that makes the repo useful both for production-style batch processing and for debugging the scenario logic without repeatedly paying the cost of deep model inference.

## The Approach

The architecture is a hybrid pipeline: learned perception for scene understanding, classic geometry and motion cues for filtering, and finite-state-machine logic for final event decisions.

### 1. Input handling and frame sampling

The main detector lives in `scenario_detection.py`. It reads footage from:

- local frames
- a local `.mp4`
- an S3 URI downloaded on demand

The pipeline processes sampled frames rather than every frame. The code assumes a 36 FPS source and typically downsamples to a lower effective rate using `process_speed`, which reduces cost while keeping enough temporal resolution for scenario reasoning.

### 2. Multi-model perception

For each sampled frame, the repository combines four complementary model streams:

- **YOLOv10** for object detection, especially vehicles and pedestrians
- **YOLOPv2** for drivable-area and lane-line extraction
- **DeepLabV3** for lane semantic segmentation
- **Depth Anything V2** for monocular depth estimation

These models are wrapped under `testing/detectors/` for live inference and under `detectors/` for consuming precomputed outputs. The split is a pragmatic one: the repository separates "run the model" from "interpret the model output."

### 3. ROI filtering and motion cues

Raw detections are not trusted equally everywhere in the frame. The code defines polygonal regions of interest for:

- the ego lane
- the adjacent left lane
- the adjacent right lane
- the overall roadway region of interest

Only detections inside those regions move forward in the reasoning pipeline. Optical flow, computed with Farneback flow, is also used to estimate ego motion while masking out dynamic objects so that object movement does not corrupt the ego signal.

This is a strong engineering choice: instead of trying to learn everything end to end, the repo imposes traffic-aware geometry to reduce noise and make later FSM decisions more stable.

### 4. Ego reasoning

The ego branch combines:

- tracked lane lines
- lane-count semantics from the segmentation mask
- filtered optical flow

From those signals, it estimates steering direction, turning intensity, lane changes, and stop/accelerate/decelerate state. Two finite state machines support this:

- `EgoStateMachine` for motion state
- `EgoManeuverStateMachine` for maneuvers such as lane changes, turns, and cut-out-style transitions

The logic also keeps cooldown windows so that one maneuver does not explode into duplicate detections across nearby frames.

### 5. Non-ego reasoning

The non-ego branch tracks vehicles and pedestrians over time using:

- Kalman filters
- Hungarian assignment for detection-to-track matching
- lane occupancy from the semantic lane mask
- relative depth trends from the monocular depth map

Each tracked object runs through its own event logic. Vehicles are evaluated for possible cut-in and cut-out behavior relative to the ego lane, while pedestrians are evaluated for crossing versus jaywalking based on motion and whether the code believes a crossing context exists.

The pipeline also marks important lead-vehicle behavior such as:

- leading vehicle slowing down
- leading vehicle stopped

This is where the repository becomes more than a detector ensemble. It is effectively a behavior interpreter built on top of object tracks.

### 6. Event aggregation, encoding, and scoring

Detected frame-level events are split into scenario windows, converted into second-based intervals, encoded into a compact integer representation, and scored with scenario-specific weights.

The output schema is intentionally simple:

- `video`
- `time`
- `event`
- `encoded_scenarios`
- `score`

That makes the final artifact easy to store, rank, filter, and hand off to downstream tools.

## The Tools Behind It

The codebase uses a practical mix of ML and systems tooling:

- **PyTorch** for model inference
- **OpenCV** for video I/O, optical flow, visualization, and Kalman filtering
- **NumPy** and **SciPy** for array math and assignment
- **Shapely** for polygon-based ROI filtering
- **Pandas** for final JSON export
- **SQLAlchemy** and **psycopg2** for querying MCDB metadata
- **boto3** for S3 downloads
- **Ultralytics / YOLOv10** for object detection

It also includes a useful operational convenience layer:

- scripts to run from raw inference, stored outputs, or in-memory outputs
- a script to cache model outputs under `testing/result/`
- optional visualization overlays for debugging

One interesting detail is that MCDB metadata is used as an additional signal. If a video matches a construction-related record in the database query path, the pipeline can tag the clip with a construction scenario before the rest of the event aggregation finishes. That is a reminder that this repository is designed for a larger data ecosystem, not only for standalone CV research.

## Outcomes

The most important outcome of this repository is not a segmentation mask or a set of boxes. It is a searchable, ranked scenario summary for each clip.

Concretely, the pipeline can produce outcomes such as:

- ego cut-in or cut-out style events
- left or right lane-change events
- leading-vehicle slowdown or stop events
- pedestrian jaywalking or crossing events
- construction-flagged clips
- parking or night-video suppression labels when the clip should be skipped

For each processed video, the repo also produces:

- event time windows in seconds
- a compact encoded scenario bitfield
- a weighted video score that reflects the relative importance of the scenarios found
- a JSON artifact that is easy to feed into annotation, triage, or simulation-selection workflows

That outcome is the real value of the project. It compresses long-form visual data into structured scenario intelligence.

## Why This Repo Is Useful

What makes this repository interesting is its engineering posture. It does not assume one model can solve scenario understanding alone. Instead, it builds a layered system:

- perception models extract scene signals
- geometry and ROI rules reduce ambiguity
- temporal tracking preserves context across frames
- finite-state machines convert noisy evidence into scenario decisions

That combination is well suited for internal data engines, especially where explainability, debuggability, and flexible operating modes matter as much as raw model accuracy.

In short, `scenario_detection` is a behavior-mining pipeline for driving video. Its problem is unstructured footage. Its role is scenario packaging. Its approach is model fusion plus temporal reasoning. Its tools are a practical CV stack. Its outcome is structured, scored events that make driving footage usable at scale.
