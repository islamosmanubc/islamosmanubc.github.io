---
title: "Video Retrieval App"
slug: "video-retrieval-app"
year: 2025
period: "2025"
subtitle: "Multimodal search over driving-video archives using text, tags, and reference clips."
summary: "A semantic retrieval interface that helps engineers find relevant driving footage quickly using text, metadata, and reference-video workflows."
featured: true
tags: ["Retrieval", "Multimodal Search", "Autonomous Driving", "Archive Search"]
stack: ["Sentence Transformers", "LLM", "Postgres", "AWS S3"]
impact: "Made large video collections easier to explore by combining embedding similarity, structured metadata, and a practical desktop workflow."
cover: "/images/projects/video-retrieval-app.jpg?v=20260406-video"
order: 2
---

## Problem

As driving datasets grow, it becomes difficult for engineers to locate the exact footage they need for error analysis, annotation, or model evaluation. Filename search and folder browsing are not enough once the archive reaches production scale.

## Role

I built the retrieval workflow end to end, from query handling and ranking logic to the desktop interface used to inspect results.

## Approach

- Supported three search modes: natural-language text, comma-separated tags, and a local reference video.
- Combined sentence-transformer embeddings with weighted tag similarity for ranking.
- Added an optional Gemini-assisted step to extract tags from free-text user input.
- Enriched results with Postgres metadata and telemetry.
- Added a built-in player, timestamped tags, details dialogs, and lazy-loaded side-camera video from S3.

## Tools

Sentence transformers, LLM-assisted query enrichment, Postgres metadata, AWS S3 media loading, and desktop GUI workflows.

## Outcome

The application made large driving-video archives much faster to search, inspect, and reuse for dataset curation, debugging, and scenario analysis.
