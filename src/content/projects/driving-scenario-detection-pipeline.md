---
title: "Driving Scenario Detection Pipeline"
slug: "driving-scenario-detection"
year: 2024
period: "2024"
subtitle: "An interpretable end-to-end pipeline for front-camera traffic-event detection."
summary: "A scenario-detection system that fuses multiple perception signals with temporal reasoning to detect meaningful driving events."
featured: true
tags: ["Scenario Detection", "Computer Vision", "Tracking", "Temporal Reasoning"]
stack: ["Python", "Deep Learning", "FSMs", "Multi-object Tracking"]
impact: "Produced interpretable event windows and confidence scores from complex perception inputs, enabling downstream labeling and model-development workflows."
cover: "/images/projects/driving-scenario-detection.jpg?v=20260406-scenario"
order: 3
---

## Problem

Scenario understanding in driving videos requires more than a single detector. Useful traffic events emerge from temporal behavior, lane structure, motion cues, and interactions between multiple actors.

## Role

I built the end-to-end detection pipeline that translates perception outputs into interpretable scenario events for downstream use.

## Approach

- Fused lane marks, object detections, lane semantics, depth, and optical flow.
- Implemented finite-state-machine reasoning on top of multi-object tracking.
- Produced event windows, scenario bitmasks, and weighted confidence scores.
- Supported multiple execution modes, including live inference, in-memory precomputed outputs, and stored outputs.
- Added optional visualization and video writing for debugging and review.

## Tools

Python, perception-model outputs, temporal logic, finite-state machines, and multi-object tracking.

## Outcome

The system delivered interpretable scenario inference rather than only black-box labels, which made it easier to inspect behavior, validate logic, and feed later annotation or modeling workflows.
