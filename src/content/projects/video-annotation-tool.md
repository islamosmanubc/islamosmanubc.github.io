---
title: "Video Annotation Tool"
slug: "video-annotation-tool"
year: 2024
period: "2024"
subtitle: "A lightweight desktop interface for interval-based scenario labeling."
summary: "An annotation interface for turning driving videos into structured event intervals with a faster, safer workflow."
featured: true
tags: ["Annotation", "Desktop Tool", "Data Labeling", "Autonomous Driving"]
stack: ["Python", "Tkinter", "Excel I/O", "Video UX"]
impact: "Accelerated scenario-label creation and improved annotation reliability through task-specific workflow features."
cover: "/images/projects/video-annotation-tool.jpg?v=20260406-annotation"
order: 4
---

## Problem

High-quality scenario labels are essential, but off-the-shelf annotation tools often do not match the exact interval-based workflow needed for driving datasets.

## Role

I built the annotation interface used to convert raw driving footage into structured event intervals that were ready for downstream analysis and training.

## Approach

- Created a Tkinter-based tool that records event intervals as video, start, end, and event tuples.
- Added folder navigation, timeline scrubbing, and label selection from a shared event list.
- Warned users when videos were already annotated to avoid duplicate work.
- Delivered a refined v2 with delete support, per-video annotation lists, immediate Excel persistence, checkpointing, and keyboard shortcuts.

## Tools

Python, Tkinter, Excel I/O, and workflow-specific video annotation UX.

## Outcome

The tool reduced friction in the manual labeling loop and made annotation throughput and reliability better aligned with the needs of the scenario-detection pipeline.
