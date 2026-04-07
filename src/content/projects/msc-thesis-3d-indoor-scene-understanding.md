---
title: "MSc Thesis: 3D Indoor Scene Understanding in Image Sequence"
slug: "msc-thesis-3d-indoor-scene-understanding"
year: 2018
period: "2015-2018"
subtitle: "RGB-D scene understanding through detection, tracking, and segmentation."
summary: "Graduate research on structured indoor-scene interpretation using RGB-D sequences and combined classical and deep computer-vision methods."
featured: false
tags: ["MSc", "RGB-D", "Scene Understanding", "Computer Vision"]
stack: ["Object Detection", "Tracking", "Segmentation", "RGB-D Vision"]
impact: "Established the research base that later evolved into work on segmentation, video understanding, and domain generalization."
cover: "/images/projects/msc-thesis-3d-indoor-scene-understanding.jpg?v=20260406-msc"
order: 7
---

# Developing a Method for 3D Scene Understanding Using Image Sequence

This M.Sc. thesis is about building a fuller understanding of indoor scenes from image sequences rather than treating recognition as a single isolated classification problem. The work combines scene recognition, RGB-D segmentation, object recognition, tracking, and semantic reasoning into one framework for indoor scene understanding.

At its core, the thesis asks a practical question: how do we move from seeing pixels to understanding what is in a room, where objects are, and how those objects relate over time?

---

## Why this thesis exists

Indoor scene understanding is difficult because it sits at the intersection of several hard subproblems. A system must recognize the overall scene, separate objects from the background, classify those objects correctly, and then track them across image sequences. Accuracy also has to survive real-world degradations such as blur, noise, and contrast changes.

This thesis was motivated by the need for a more complete pipeline. Rather than focusing only on scene classification or only on segmentation, it builds a broader framework that combines the major components needed for indoor understanding.

---

## My role

My role in this thesis was to design the framework, carry out the comparative studies, implement the segmentation and recognition pipeline, evaluate shallow and deep learning approaches, and integrate tracking into the final scene-understanding workflow.

In practice, that meant working across several layers:

- comparative evaluation of recognition models,
- RGB-D segmentation design,
- hierarchical object classification,
- tracking across image sequences,
- and semantic relation modeling between recognized objects.

This made the thesis much more than a classifier comparison. It became a system-level exploration of how multiple vision components can work together.

---

## The core problem

A room image contains information at several levels.

A model may need to answer all of the following:

- What type of scene is this?
- Which objects are present?
- Where does each object begin and end?
- How do those objects move or persist across frames?
- What relations exist between them?

Traditional approaches often solve only one of these tasks well. The thesis addresses the broader problem by creating a pipeline that combines scene recognition, segmentation, object classification, tracking, and semantic summarization.

---

## Approach

The thesis approaches 3D scene understanding as a pipeline rather than a single predictor.

## 1. Compare shallow and deep learning for indoor scene classification
The first major component is a comparative study of supervised learning models for indoor scene recognition. The work evaluates multiple shallow-learning approaches against deep-learning architectures and also tests robustness under environmental degradation such as:

- contrast degradation,
- additive blurring,
- additive Gaussian noise.

This comparison establishes a clear performance baseline and helps identify when classical methods remain useful.

The results show that deep learning outperforms shallow learning by a large margin overall, especially with **VGG-16**. Fine-tuning a pre-trained VGG-16 model improves scene classification accuracy to **85.43%** while also reducing training time by about **20%**.

## 2. Use RGB-D information for segmentation
The second major component is segmentation for object recognition.

The proposed segmentation method uses **depth information** as a strong cue and processes both:

- the **RGB image**,
- and the **depth image**.

The two segmentation outputs are then combined to improve object isolation before recognition. This is important because better object boundaries make later recognition more reliable.

The thesis reports that the segmentation method achieves **73.41%** correct segmentation on the **NYU V2 RGB-D indoor scene dataset** and runs at an average of **11 seconds per image**, faster than other related methods discussed in the thesis.

## 3. Perform hierarchical object recognition
Once segmented objects are available, the framework applies a hierarchical recognition scheme based on multiple shallow-learning stages.

The hierarchy works by classifying objects using:
- the scene category,
- the occupied object area,
- and then **HOG-based** descriptors.

This structured recognition design is a key part of the thesis because it treats object classification as context-aware rather than fully flat.

The reported hierarchical classification accuracy is **65.73%**.

## 4. Strengthen scene understanding with deep learning
The hierarchical object classification result is then used to train scene-category-specific deep models. This leads to a stronger final scene-recognition result.

Using this deeper integrated setup, the framework reaches **89.24%** accuracy for scene recognition.

## 5. Track recognized objects across image sequences
The thesis then extends static understanding into temporal understanding.

Recognized objects are tracked by extracting **Shi-Tomasi good features** and following them in the next image using the **pyramidal Lucas-Kanade tracker**. This lets the framework reuse information over time instead of recomputing everything from scratch for each frame.

The result is a substantial efficiency gain: for a sequence of 10 frames, the tracking-based strategy improves the speed of the indoor scene-understanding framework by **10×**, since the full processing is applied only to the first frame and then only to the newly changing parts of the scene.

## 6. Move toward semantic scene understanding
Finally, the framework defines relations between recognized objects in the scene, pushing the system closer to a semantic description of the environment instead of a disconnected set of detections.

That makes the thesis a scene-understanding pipeline in the true sense: from low-level image evidence to higher-level interpretation.

---

## Tools, models, and research ingredients

This thesis combines classical vision, RGB-D processing, and deep learning.

### Core themes
- indoor scene understanding
- scene classification
- RGB-D segmentation
- object recognition
- hierarchical classification
- feature tracking
- semantic relation modeling

### Learning models and descriptors mentioned in the thesis
- shallow learning methods
- deep learning methods
- **VGG-16**
- **GoogLeNet**
- **PlacesCNN**
- **HOG-SVM**
- feature descriptors such as **SIFT**, **SURF**, **ORB**, **BRISK**, **LBP**, and **HOG**

### Vision components
- RGB image segmentation
- depth image segmentation
- RGB-D fusion
- Shi-Tomasi feature extraction
- pyramidal Lucas-Kanade tracking

The strength of the work lies in how these components are connected into one system.

---

## Outcomes

The thesis delivers several concrete outcomes.

### Outcome 1: strong scene-recognition performance
Fine-tuning pre-trained VGG-16 improves indoor scene classification to **85.43%**, with about **20%** training-time savings.

### Outcome 2: a practical RGB-D segmentation method
The proposed segmentation pipeline achieves **73.41%** correct segmentation on **NYU V2** and averages **11 seconds per image**.

### Outcome 3: hierarchical object recognition
The object-classification stage reaches **65.73%** accuracy and provides structured object-level understanding inside the scene.

### Outcome 4: stronger final scene understanding
The integrated deep-learning stage reaches **89.24%** scene-recognition accuracy.

### Outcome 5: faster processing over image sequences
Tracking across 10-frame sequences improves speed by **10×** by avoiding full recomputation on every frame.

### Outcome 6: a full scene-understanding framework
Perhaps the most important outcome is architectural: the thesis proposes a multi-stage framework that combines classification, segmentation, recognition, tracking, and semantic reasoning instead of solving only one task in isolation.

---

## What I like most about this thesis

What I like most is that it has a systems perspective early on. Instead of stopping at “which classifier is best,” the thesis keeps asking what a full understanding pipeline needs in order to work on real indoor scenes.

That leads naturally to a framework where classification, segmentation, tracking, and semantics all reinforce one another.

---

## Closing thoughts

**Developing a Method for 3D Scene Understanding Using Image Sequence** is a thesis about assembling a more complete vision pipeline for indoor environments. It shows how RGB-D cues, hierarchical recognition, deep learning, and temporal tracking can be combined to move from raw images toward meaningful scene understanding.

The result is not just better recognition numbers. It is a stronger blueprint for building systems that understand structured indoor environments over time.
