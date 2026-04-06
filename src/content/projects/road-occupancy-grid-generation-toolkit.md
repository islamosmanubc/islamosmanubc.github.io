---
title: "Road Occupancy-Grid Generation Toolkit"
slug: "occupancy-grid-toolkit"
year: 2026
period: "2026-Present"
subtitle: "Production tooling for generating and editing structured bird's-eye road-scene representations."
summary: "A GUI-driven toolkit for generating, inspecting, and editing road occupancy-grid outputs from driving perception results and telemetry."
featured: true
tags: ["Autonomous Driving", "Tooling", "Occupancy Grid", "Perception"]
stack: ["Python", "GUI", "Telemetry", "Computer Vision"]
impact: "Turned raw perception and telemetry outputs into editable scene representations that support debugging, labeling, and downstream modeling."
cover: "/images/projects/occupancy-grid-toolkit.jpg?v=20260406"
order: 1
---

## Problem

Driving perception teams often need a structured bird's-eye representation of the scene, but the raw inputs arrive from several pipelines at once: lanes, masks, depth estimates, tracking, and telemetry. Without a usable tooling layer, inspecting or correcting those outputs becomes slow and error-prone.

## Role

I designed and built the toolkit layer that makes occupancy-grid generation operational for engineers and annotators rather than leaving it as a fragile batch pipeline.

## Approach

- Built a desktop interface with run, pause, resume, and stop controls for long processing jobs.
- Added a large-scale JSON visualizer and editor for inspecting generated occupancy-grid artifacts.
- Implemented and maintained ROADSv2 occupancy-grid generation from lanes, masks, depth, and tracking.
- Added post-processing utilities for propagation, refinement, and object-level corrections.
- Extended the toolkit with auxiliary utilities such as relative-speed labeling and lane counting.

## Tools

Python, GUI workflows, telemetry integration, and computer-vision post-processing pipelines.

## Outcome

The result is a production-oriented tooling system that converts raw perception outputs into structured, editable assets that can be reviewed, corrected, and reused downstream.
