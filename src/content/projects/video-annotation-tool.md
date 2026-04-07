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

# Video Annotation Tool

A lightweight desktop tool for reviewing videos one by one, defining event boundaries, and saving annotations in a format that is easy to revisit and extend. The goal of the project is simple: make manual video labeling less painful.

---

## Why this tool exists

Video datasets often become usable only after someone sits down and marks where important events begin and end. That sounds straightforward until the dataset grows into hundreds or thousands of clips. At that point, the real bottleneck is not model training. It is the human review loop.

The problem I wanted to solve with this tool was the everyday friction of annotation work:

- opening clips one at a time,
- remembering where I stopped,
- keeping labels consistent,
- saving event ranges reliably,
- and avoiding the overhead of heavier enterprise annotation platforms for a focused internal workflow.

Instead of building a complex cloud product, I built a practical desktop utility that makes the essential steps fast: load a folder, inspect a clip, mark start and end times, assign a label, save, and move on.

---

## My role

My role in this project was to design and implement the annotation workflow end to end.

That included:

- designing the reviewer-facing desktop interface,
- building the video loading and frame navigation logic,
- defining how annotations are created and deleted,
- persisting labels to disk in a simple tabular format,
- and making the session resumable so work is not lost between runs.

The focus was not flashy UI. It was reliability, speed, and low friction for repeated annotation sessions.

---

## The core problem

Manual video annotation becomes inefficient when the reviewer has to juggle too many small tasks outside the actual labeling decision.

A reviewer typically needs to:

1. browse a directory of clips,
2. open the current video,
3. scrub to the right moment,
4. mark the beginning and end of an event,
5. assign a label,
6. save the result,
7. move to the next video,
8. and later resume from wherever the work stopped.

When these steps are scattered across different scripts or tools, the annotation process becomes slow and error-prone. This project addresses that by keeping navigation, labeling, persistence, and review in one compact tool.

---

## Approach

## 1. Treat folder structure as the dataset index

The tool opens a chosen folder, scans subdirectories, and builds an in-memory dataset of available videos. Each subfolder becomes a selectable group in the interface, which makes it easy to organize annotation work by batch, scenario type, source, or experiment.

This turns ordinary folders into a simple annotation queue without requiring a database server.

## 2. Show one video clearly and keep the labeling context beside it

The interface places the current video frame on the left and the list of annotations for the current clip on the right. That layout matters because the reviewer can immediately see what has already been labeled before adding more event ranges.

The current video is displayed using OpenCV frame extraction and rendered into the desktop UI, while the annotation list updates every time a save or delete action happens.

## 3. Make temporal annotation direct

The workflow for labeling is deliberately small:

- move the slider to a point in the clip,
- press **start event**,
- move to another point,
- press **end event**,
- choose or type a label,
- save the event.

This makes the tool especially suitable for event-based annotations such as braking, lane changes, pedestrian interactions, or any other bounded temporal segment.

## 4. Support both controlled labels and new labels

The UI supports a dropdown of existing event labels and also lets the annotator type a new label and add it to the list. This is useful early in a project, when the taxonomy is still evolving.

The goal is to balance consistency and flexibility:

- existing labels reduce spelling drift,
- new labels allow the taxonomy to grow when new event types appear.

## 5. Persist everything in simple files

The annotation records are stored in an Excel file with the columns:

- `video`
- `start`
- `end`
- `event`

The app also stores additional session state in JSON files, including:

- the current starting index per directory,
- the discovered directory structure,
- and the list of available event labels.

That makes the workflow resumable and transparent. The data is not hidden behind a complex proprietary format.

## 6. Speed up frequent actions with shortcuts

Because annotation is repetitive, the tool binds keyboard shortcuts for the main actions:

- `s` for start event,
- `d` for end event,
- `f` for save event,
- `t` for delete event.

This reduces mouse travel and makes repeated marking much faster in practice.

---

## Tools and implementation

The tool is intentionally built with a compact Python desktop stack.

### Interface
- **Tkinter** for the desktop GUI
- standard widgets such as buttons, comboboxes, entry fields, listboxes, scrollbars, and sliders

### Video processing
- **OpenCV** for loading videos, seeking frames, and reading frame metadata such as FPS and total frame count

### Image display
- **PIL / ImageTk** for converting OpenCV frames into GUI-ready images

### Data persistence
- **Pandas** for loading and saving annotations to Excel
- **JSON** files for session state, label history, and directory progress

This choice of tools keeps the application easy to run, easy to modify, and easy to reuse in research or internal annotation workflows.

---

## What the user can do with it

From the reviewer’s perspective, the workflow is straightforward:

1. Open a folder that contains videos or subfolders of videos.
2. Choose a directory batch from the dropdown.
3. Inspect the current clip.
4. Use the slider to jump to the relevant moment.
5. Mark the start and end of the event.
6. Select an existing label or type a new one.
7. Save the annotation.
8. Move to the next or previous video.
9. Delete an incorrect annotation if needed.
10. Close the tool and return later without losing progress.

That is the kind of flow that matters when the same task is repeated hundreds of times.

---

## Outcomes

The outcome of this project is a practical annotation utility rather than a research benchmark.

### Outcome 1: a single focused labeling workflow
The tool combines video browsing, frame scrubbing, temporal marking, label assignment, and annotation review in one place.

### Outcome 2: low-friction dataset building
Because annotations are saved directly to Excel and the label vocabulary can grow over time, the tool supports early-stage dataset creation when the schema is still evolving.

### Outcome 3: resumable progress
The app stores progress by directory and preserves known labels between sessions, which is important for long annotation jobs.

### Outcome 4: faster repetitive work
Keyboard shortcuts, side-by-side annotation review, and direct frame seeking reduce the overhead around each labeling decision.

### Outcome 5: transparent data ownership
The output lives in ordinary files rather than a hidden backend, making it easier to audit, share, version, and post-process the annotations.

---

## What I like most about this project

What I like most is that it solves a very real pain point with minimal machinery. It does not try to be a universal annotation platform. It focuses on the moment when a researcher or engineer simply needs to get through a queue of clips efficiently and reliably.

That kind of tool often has outsized value because it improves the quality and speed of everything that comes after it: dataset creation, evaluation, error analysis, and model iteration.

---

## Closing thoughts

The Video Annotation Tool is a small but useful example of applied tooling for machine learning workflows. It turns raw clips into structured event data through a review loop that is simple, fast, and easy to resume.

Sometimes the biggest productivity gain in an AI pipeline does not come from a new model. It comes from building the right tool around the people preparing the data.
