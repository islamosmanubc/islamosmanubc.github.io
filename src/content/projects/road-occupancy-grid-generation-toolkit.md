---
title: "Road Occupancy-Grid Generation Toolkit"
slug: "occupancy-grid-toolkit"
year: 2026
period: "2026-Present"
organization: "Matt3r.AI"
subtitle: "Production tooling for generating and editing structured bird's-eye road-scene representations."
summary: "A GUI-driven toolkit for generating, inspecting, and editing road occupancy-grid outputs from driving perception results and telemetry."
featured: true
tags: ["Autonomous Driving", "Tooling", "Occupancy Grid", "Perception"]
stack: ["Python", "GUI", "Telemetry", "Computer Vision"]
impact: "Turned raw perception and telemetry outputs into editable scene representations that support debugging, labeling, and downstream modeling."
cover: "/images/projects/occupancy-grid-toolkit.jpg?v=20260406"
order: 1
---

# ROADSv2: Turning Driving Perception into a Usable Road Scene

ROADSv2, short for **Robust Occupancy grid And Dynamic Segments version 2**, is the part of the project that turns a pile of perception outputs into a structured description of what is happening on the road. Instead of treating lane masks, depth maps, tracking boxes, optical flow, and telemetry as separate products, ROADSv2 combines them into one scene model that is easier to inspect, debug, and use downstream.

It is not just a visualization layer. It is the scene-structuring layer of the project: the part that decides where the ego vehicle is in the lane layout, where surrounding actors belong in an occupancy grid, when the road topology changes, and how motion and turn context should be attached to the final output.

<figure>
  <img
    src="../../images/projects/roadsv2-pipeline.jpg?v=20260406-roadsv2"
    alt="ROADSv2 pipeline showing dashcam frames, lane detections, road masks, ego-lane masks, lane semantic segmentation, optical flow, depth maps, QDTrack tracking JSON, Google Maps BEV priors, and SEI telemetry flowing into structured road-scene outputs."
  />
  <figcaption>
    ROADSv2 pipeline from multi-source driving perception inputs to occupancy-grid JSON, lane-level masks, road segments, detected turns, motion labels, GUI visualizations, and editable outputs.
  </figcaption>
</figure>

## The Problem

Modern driving pipelines already produce a lot of signals. The issue is that those signals usually arrive as isolated artifacts:

- lane lines from one model
- road masks from another
- ego-lane masks from a segmentation model
- object tracks from QDTrack
- depth estimates from a monocular depth model
- motion hints from optical flow
- telemetry from SEI data

Individually, these outputs are useful, but they do not answer the practical question: **what is the road scene, frame by frame, in a form that can be audited and edited?**

That gap matters for several reasons. Raw detections flicker. Lane counts change noisily. Vehicles disappear and reappear. Turn interpretation can be weak when relying on a single source. And even when the models are mostly correct, engineering teams still need a representation that can be visualized, validated, and revised by humans.

ROADSv2 addresses that gap by converting fragmented perception outputs into a single, structured road-scene representation.

## The Role of ROADSv2

In this project, ROADSv2 plays five roles at once.

First, it is a **fusion layer**. It gathers outputs from multiple perception sources and lines them up around the same driving scene.

Second, it is a **scene-normalization layer**. It converts the world into an ego-relative occupancy grid where the ego vehicle is anchored consistently and other actors are placed into lane-aware grid coordinates.

Third, it is a **topology interpreter**. It detects lane availability, lane-count transitions, turns, and road segments so the output is more than a stack of frames.

Fourth, it is a **debugging surface**. The GUI exposes the pipeline with visual previews for lane semantics, left/right lane structure, occupancy-grid rendering, and a road-segment timeline.

Fifth, it is a **data product generator**. The main result is an occupancy-grid JSON with per-frame objects, segment information, turn annotations, and motion semantics that can be used for analysis, review, or downstream systems.

## The Approach

ROADSv2 uses a multi-stage approach rather than trusting any single model output.

### 1. Build a lane-centric view of the scene

The pipeline starts from lane detections, road masks, ego-lane segmentation, and lane semantic segmentation. These inputs are combined to infer the active lane structure around the ego vehicle. The code constructs left, ego, and right lane masks, estimates ego offset inside the lane, and keeps track of which adjacent lanes really exist.

This matters because the occupancy grid is only meaningful when the lane geometry is stable enough to support actor placement.

### 2. Convert tracked actors into occupancy-grid objects

Tracked detections are read from QDTrack, then enriched with depth and lane context. ROADSv2 maps each actor into an ego-relative occupancy grid with lane-aware columns and depth-like rows. The ego vehicle is fixed in the grid, while surrounding actors are placed based on their estimated lane and distance.

The result is a compact scene representation that is easier to reason about than raw image-space boxes.

### 3. Add motion understanding instead of pure geometry

ROADSv2 does not stop at placement. It also uses the relative-speed pipeline to classify object motion, producing labels such as:

- `same_direction`
- `opposite_direction`
- `parked`
- `stopped_ego_direction`

These labels are written into the output and used in visualization. That gives the grid semantic value: not just where an object is, but how it is behaving relative to the ego vehicle.

### 4. Detect turns and road-segment changes

The pipeline combines optical flow with SEI telemetry to interpret turning behavior more robustly. It also tracks when lane layout changes indicate merges, branches, or transitions between road segments.

Instead of leaving these as implicit patterns spread across many frames, ROADSv2 turns them into explicit segment metadata and detected turn spans. That is a major shift from frame-level perception to scenario-level structure.

### 5. Post-process for stability

Raw frame-by-frame outputs are noisy. ROADSv2 adds post-processing for vehicle depth smoothing and disappear/reappear interpolation. This reduces unrealistic jumps and reconstructs more stable actor trajectories through short gaps.

That step is important because a structured scene representation is only useful if it is stable enough to trust and inspect.

## The Tools Behind It

ROADSv2 stands out because it is built as a practical engineering system, not just a research script.

### Perception inputs

The pipeline consumes:

- lane detections
- road masks
- ego-lane masks
- lane semantic segmentation
- optical flow
- depth maps
- QDTrack tracking JSON
- RGB frames
- optional Google Maps BEV lane priors
- optional SEI telemetry data

### Core processing modules

The codebase organizes key responsibilities into dedicated components:

- `LaneProcessor` for lane cleanup, contour processing, and lane-mask generation
- `DepthProcessor` for depth smoothing behavior
- `TurnDetector` for turn-state reasoning
- `GridRenderer` for occupancy-grid visualization
- `RelativeSpeedPipeline` for object motion labeling from depth, tracking, and telemetry

That modularization makes the system easier to evolve than a single monolithic script.

### Interfaces

ROADSv2 is available through two interfaces:

- a **GUI** for running the pipeline with previews and inspecting the output visually
- a **CLI** for batch or headless processing

The GUI is especially important for this project because it exposes the pipeline as something engineers can audit. The visualizer goes beyond playback: it supports object inspection, occupancy-grid editing, and road-segment editing on top of the generated JSON.

### External context sources

Two additions make ROADSv2 more than a pure vision stack:

- **Google Maps BEV lane priors** help stabilize lane-count reasoning
- **SEI telemetry** improves event and turn interpretation while also supporting relative-speed enrichment

Those additions reduce the risk of over-trusting noisy visual evidence when better priors are available.

## The Outcomes

The outcome of ROADSv2 is not just a cleaner visualization. It is a more usable road-scene product.

### 1. A structured occupancy-grid JSON

The pipeline writes a JSON file that captures:

- frame-wise occupancy-grid objects
- ego position and lane context
- road-segment IDs
- lane-count metadata
- detected turns
- motion labels and relative speed fields

This output is much closer to a scenario description than to a raw perception dump.

### 2. Better stability across frames

Depth smoothing and interpolation reduce jitter and broken trajectories. That leads to a representation that is more consistent for both automated analysis and human review.

### 3. Stronger road-topology reasoning

By combining lane perception with Google Maps priors and explicit segment tracking, ROADSv2 produces a more stable understanding of lane count, merges, branches, and segment transitions.

### 4. Better interpretability for engineers

The previews in the GUI make the pipeline legible:

- lane-semantic overlays show what the system believes about the drivable lane structure
- left/right lane previews expose lane-shape reasoning
- occupancy-grid views show the compact spatial model
- road-segment timelines reveal how the trip is partitioned over time

That interpretability is a real outcome, not a cosmetic one. It shortens debugging loops and makes failures easier to diagnose.

### 5. A bridge from perception to scenario understanding

The biggest outcome is architectural. ROADSv2 acts as the bridge between raw perception outputs and a scenario-oriented representation of the road scene. That is the layer that makes the rest of the project coherent.

## Why ROADSv2 Matters

Projects like this often fail at the seam between model outputs and usable system behavior. ROADSv2 is the part that closes that seam. It gives the project a way to take noisy, heterogeneous signals and turn them into something structured, reviewable, and operational.

In that sense, ROADSv2 is not just version 2 of an occupancy-grid generator. It is the project's attempt to make road-scene understanding concrete enough to inspect, edit, and trust.
