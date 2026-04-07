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

# Video Retrieval App

A practical desktop tool for searching large collections of driving videos by **natural-language description**, **tag lists**, or even **an example video file**. Instead of forcing a reviewer to manually scan folders of clips, the app turns every video into a searchable unit with tags, embeddings, and linked metadata, then brings the most relevant results back into one inspection workflow.

<figure>
  <img
    src="../../images/projects/video-retrieval-app-architecture.jpg?v=20260406-video-pipeline"
    alt="Video Retrieval App pipeline showing description, tag, and example-video queries flowing through query representation, semantic retrieval, top-k video results, and a Qt review interface with metadata and telemetry panels."
  />
  <figcaption>
    Pipeline view of the Video Retrieval App, from description, tag, and example-video queries through semantic retrieval into a review interface with metadata, telemetry, and side-camera inspection.
  </figcaption>
</figure>

---

## Why this tool exists

Modern driving datasets grow faster than humans can browse them. A team may know that somewhere in the archive there is *"a cloudy urban clip with a pedestrian and a right turn"*, but finding it manually is slow, repetitive, and error-prone. Search becomes even harder when different teams think in different abstractions: one person remembers a scene in words, another remembers a few tags, and another has a similar clip on disk but not the exact one they need.

That is the problem this app is trying to solve: **make driving-video retrieval fast, flexible, and inspection-friendly**.

It is not just a search box over filenames. It is a retrieval workflow that lets the user start from three different entry points:

- a **description** of the scene,
- a **comma-separated set of tags**,
- or a **local example video**.

From there, the app ranks relevant videos, lets the user play the result, jump through timestamped tags, and open a richer details view with telemetry and side-camera context.

---

## My role

My role in this project was to design and implement the application as an **AI-assisted retrieval and inspection interface** for driving videos.

That meant bringing together several responsibilities into one usable desktop tool:

- designing the **retrieval logic**,
- structuring the **metadata and embedding backend**,
- building the **desktop interface**,
- integrating **cloud storage and metadata services**,
- and making the results easy to **review, validate, and explain**.

In practice, the job was not only to return a ranked list. It was to make retrieval useful for engineers and reviewers who need context after the search result appears.

---

## The core problem

Video search is harder than text search because the user's memory of a clip rarely matches the way the clip is stored.

A video may be remembered as:

- *"that clip with a pedestrian crossing on a cloudy street"*,
- *"right-turn, pedestrian, urban"*,
- or *"something like this other video"*.

Traditional indexing methods break down because filenames are weak signals and raw video is too expensive to browse exhaustively. The challenge is to support all three retrieval styles without building three separate tools.

This app addresses that by treating retrieval as a **shared embedding-and-metadata problem**. Every video is represented by tags, frequencies, unique labels, embeddings, and linked metadata. Then the app chooses the search path that matches the user's input mode.

---

## Approach

## 1. Build a searchable video manifest

The app loads a parquet manifest that contains, for each video, its identifier, video URI, embedding, timestamped tags, unique tags, tag frequencies, actors, context, and question summaries. That manifest becomes the searchable memory of the system.

In other words, the retrieval engine does not search raw video frames directly at query time. It searches a prepared representation of each video.

## 2. Support three kinds of search

### Description mode
The user writes a natural-language description such as:

> cloudy urban scene with pedestrians and right turn

The app sends that description to a Gemini model and asks it to select the most relevant tags from a fixed tag vocabulary. Those extracted tags then become the actual retrieval query.

### Tags mode
The user directly enters comma-separated tags. This is the fastest mode when the user already knows the vocabulary or wants tighter control over retrieval.

### Video mode
The user chooses a local video file. The app matches the file basename to the manifest, retrieves the stored pooled embedding and tag statistics for that video, and uses that representation to retrieve similar clips.

That makes the tool useful for "find me more like this" workflows, not just text search.

## 3. Rank results semantically

Once the query representation is ready, the backend compares it against the stored video embeddings using a weighted semantic similarity calculation. Tag frequency is part of the scoring logic, so repeated or dominant concepts matter more than rare ones.

The result is a ranked list of candidate videos with similarity scores.

## 4. Turn retrieval into inspection

A good retrieval result is only the beginning. The app then lets the user inspect the match through:

- a front-video player,
- clickable timestamped tags,
- a details dialog for actors and context,
- question summaries,
- CoreML tags,
- IMU gyro and acceleration plots,
- trip-level telemetry,
- and lazy-loaded side-camera videos.

That makes the app not just a retriever, but also a **review station**.

---

## Tools and system components

The implementation combines several layers.

### Desktop UI
- **PySide6 / Qt** for the main desktop application
- `QMediaPlayer` and `QVideoWidget` for playback
- list widgets, combo boxes, sliders, split views, dialogs, and tabs for interaction

### AI and retrieval
- **Google Gemini** to convert free-form descriptions into fixed-vocabulary tags
- **SentenceTransformers** (`all-MiniLM-L6-v2`) to encode tags and compare them semantically
- **Torch** utilities for cosine-similarity-based ranking

### Data and storage
- **Parquet / PyArrow** for the manifest of searchable video records
- **NumPy** for embedding storage and manipulation
- **PostgreSQL** for linked metadata lookup
- **Amazon S3** for video and telemetry assets

### Visualization and inspection
- **Matplotlib** for telemetry plots
- support for front video, back video, left repeater, right repeater, IMU streams, and trip data

### Networking and delivery
- presigned S3 URLs for secure temporary access
- parallel range downloads for faster media fetching
- local caching to avoid repeated downloads

---

## What the user can do with it

From the user's perspective, the workflow is simple:

1. Choose a mode: **Description**, **Tags**, or **Video**.
2. Enter a query or select a local clip.
3. Request the top-*k* results.
4. Inspect the retrieved list.
5. Play a result immediately.
6. Click a tag to jump to the relevant moment.
7. Open **Details** to inspect actors, scene context, question summaries, CoreML outputs, IMU plots, trip telemetry, and side views.

That combination matters because retrieval without verification is fragile. This app keeps search and validation in the same loop.

---

## Outcomes

The strongest outcome of the project is not a single model number. It is a usable retrieval workflow that supports multiple search behaviors in one interface.

### Outcome 1: one app, three retrieval styles
The system supports:

- text-to-video retrieval,
- tag-to-video retrieval,
- and video-to-video retrieval.

That reduces friction for different users and use cases.

### Outcome 2: richer search context
Each result is more than a filename. The app exposes timestamped tags, actor detections, context segments, question summaries, CoreML tags, and telemetry-linked assets. That gives users evidence for why a result was returned and whether it is actually useful.

### Outcome 3: faster review workflow
Because playback, tag seeking, details inspection, and telemetry plots live inside the same desktop app, the user can move quickly from retrieval to verification without switching across multiple tools.

### Outcome 4: practical engineering integration
The design connects a parquet-based search index, an embedding model, a generative model, PostgreSQL metadata, and S3-hosted assets into a single product-shaped tool. That makes it closer to a deployable internal application than a standalone demo script.

---

## What I like most about this project

What makes this tool interesting is that it treats retrieval as a real product problem rather than only a modeling problem.

A lot of video search systems stop after ranking. This one keeps going. It asks:

- Can the user search in the way they naturally think?
- Can the result be validated quickly?
- Can supporting signals be surfaced without opening five more tools?

That is where the app becomes useful in practice.

---

## Closing thoughts

The Video Retrieval App is a compact example of applied multimodal AI engineering. It uses language, tags, embeddings, metadata, and media inspection together to solve a very practical problem: **finding the right driving video quickly and understanding why it was retrieved**.

In a larger production setting, this kind of tool could sit between dataset creation, scenario mining, safety review, and model evaluation. It turns a passive archive into a searchable, inspectable working asset.
