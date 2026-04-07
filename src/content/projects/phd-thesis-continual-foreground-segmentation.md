---
title: "PhD Thesis: Continual Foreground Segmentation with Limited Data"
slug: "phd-thesis-continual-foreground-segmentation"
year: 2023
period: "2019-2023"
subtitle: "Continual and data-efficient vision research for robust foreground segmentation."
summary: "A long-term research program on foreground segmentation under limited-data settings, emphasizing continual adaptation and generalization."
featured: true
tags: ["PhD", "Continual Learning", "Segmentation", "Few-shot Learning"]
stack: ["Computer Vision", "Continual Learning", "Transformers", "Research"]
impact: "Produced multiple peer-reviewed outputs and a coherent research direction around adaptation, catastrophic forgetting, and data efficiency."
cover: "/images/projects/phd-thesis-continual-foreground-segmentation.jpg?v=20260406-phd"
order: 6
---

# Continual Foreground Segmentation with Limited Data

This Ph.D. thesis is about a problem that sits at the heart of practical computer vision: segmentation models look impressive when they are trained on large labeled datasets under fixed conditions, but they become fragile when the real world becomes harder. Fine object boundaries are missed, labeled data is scarce, new domains appear, and models forget old knowledge when they are adapted sequentially.

The thesis tackles that full problem rather than only one slice of it. It proposes a series of deep-learning models that improve fine-detail foreground segmentation, reduce dependence on large labeled datasets, mitigate catastrophic forgetting, and finally combine the strongest ideas into one unified framework called **UFSeg**.

---

## Why this thesis exists

Foreground segmentation is a foundational task for many downstream systems, including tracking, scene understanding, surveillance, behavior analysis, and autonomous systems. But strong benchmark performance does not automatically translate into robust deployment.

The core limitations are clear:

- many models miss **fine exterior details** of objects,
- performance drops sharply when labeled data is limited,
- models often generalize poorly beyond the conditions they were trained on,
- and sequential multi-domain learning introduces **catastrophic forgetting**.

This thesis was motivated by the need to move beyond narrow benchmark success and design segmentation methods that are both more accurate and more adaptable.

---

## My role

This thesis represents my work as the primary researcher, model designer, experimenter, and author.

My role included:

- formulating the research problems,
- proposing multiple new model architectures,
- designing experiments across fine-detail segmentation, few-shot learning, and lifelong learning,
- analyzing the tradeoffs between accuracy, data efficiency, and forgetting,
- and finally integrating the strongest ideas into a unified model.

Rather than treating each chapter as an isolated paper, I used the thesis to build a connected story: from better boundaries, to limited-data learning, to continual adaptation, to one combined solution.

---

## The core problem

The thesis is built around three major weaknesses in state-of-the-art foreground segmentation systems.

### 1. Fine detail is hard
Many segmentation models are good at roughly detecting a foreground region, but they lose thin structures and boundary precision. That makes them less useful when accurate silhouettes matter.

### 2. Labeled data is expensive
High-performing models often depend on large annotated datasets, but in many applications only a handful of labeled examples are available.

### 3. Learning new domains causes forgetting
A model trained sequentially across multiple datasets or environments often overwrites earlier knowledge. This catastrophic forgetting limits real continual learning.

The thesis treats these not as separate annoyances, but as connected barriers to real-world segmentation systems.

---

## Approach

The thesis moves through four stages, each solving a different layer of the problem.

## 1. Improve fine-detail foreground segmentation
The first technical stage focuses on recovering accurate object boundaries and richer foreground structure.

Three models are proposed:

- **MODY-Net**
- **REFNet**
- **TransBlast**

Among them, **REFNet** is the strongest answer to the fine-detail problem. Its region-and-edge fusion design explicitly helps the model learn both object interiors and boundaries, leading to sharper segmentation outputs. The thesis reports that REFNet improves f-measure over other foreground segmentation models by about **4%**.

## 2. Learn with limited labeled data
The second stage addresses data scarcity.

Three few-shot learning techniques are proposed:

- **KTNet**
- **ORIF-TR**
- **FeSh-Net**

KTNet combines few-shot and self-supervised learning for image classification. ORIF-TR and FeSh-Net adapt these limited-data ideas to foreground segmentation itself. The most practical result here is that FeSh-Net learns from an exemplar frame and segments the current frame with strong performance, boosting the then state of the art by **7.7%**. The thesis also states that the few-shot methods can work with as little as **one labeled frame** in some settings.

## 3. Learn continuously without forgetting
The third stage targets catastrophic forgetting through lifelong learning.

Three continual-learning techniques are proposed:

- **TBPI**
- **KDNet**
- **DGT**

These methods use a **server-client architecture**. A larger server model learns from continuous data, while a compact client model is instantiated for efficient inference. This is important because it links continual learning with practical deployment.

Among the three, **DGT** performs best. The thesis reports that DGT exceeds the prior state of the art by **4.65%** while running at **11.4 FPS**.

## 4. Unify the best ideas into one model
The final stage proposes **UFSeg**, a unified model that combines the strongest components from earlier chapters:

- **REFNet** for fine-detail segmentation,
- **FeSh-Net** for limited-data learning,
- **DGT** for continual learning without catastrophic forgetting.

UFSeg is the thesis-level synthesis: one model intended to solve all four major challenges together. The thesis reports that UFSeg outperforms state-of-the-art foreground segmentation models by **1.34%** and can also operate on out-of-domain real-world imagery such as webcam or public IP camera frames.

---

## Tools, methods, and research ingredients

This thesis is fundamentally a deep-learning research project, but its strength comes from combining several ideas rather than relying on one trick.

### Core research themes
- foreground segmentation
- fine-detail boundary modeling
- few-shot learning
- self-supervised learning
- lifelong / continual learning
- server-client model design
- out-of-domain generalization

### Model families introduced in the thesis
- MODSiam
- MODY-Net
- REFNet
- TransBlast
- KTNet
- ORIF-TR
- FeSh-Net
- TBPI
- KDNet
- DGT
- UFSeg

### Evaluation perspective
The thesis is not only about accuracy. It also considers:
- limited-label regimes,
- sequential learning settings,
- catastrophic forgetting,
- and practical inference efficiency.

That broader evaluation view is what makes the work feel like a systems-oriented research program rather than a single-model benchmark exercise.

---

## Outcomes

The outcomes of the thesis are both scientific and practical.

### Outcome 1: sharper foreground boundaries
REFNet shows that explicit region-and-edge reasoning can substantially improve the quality of segmentation boundaries, with an approximately **4%** f-measure gain.

### Outcome 2: stronger learning under limited data
The few-shot methods demonstrate that segmentation systems can remain competitive even when very little labeled data is available. FeSh-Net improves performance by **7.7%**, and the broader limited-data framework shows that even one labeled frame can be useful in the right setup.

### Outcome 3: continual learning without catastrophic forgetting
The lifelong learning stage produces models that can adapt across sequential data streams while preserving earlier knowledge. DGT is the strongest result here, delivering a **4.65%** improvement and **11.4 FPS** inference.

### Outcome 4: a unified segmentation framework
UFSeg integrates the best ideas from the thesis into one system. It improves over the state of the art by **1.34%** and extends beyond benchmark settings into real-world out-of-domain examples.

### Outcome 5: a coherent research program
The thesis resulted in a substantial research body with multiple journal and conference papers, showing that each technical stage was strong enough to stand on its own while still contributing to a unified thesis story.

---

## What I like most about this thesis

What I like most is that the thesis does not stop at identifying problems. It keeps pushing until the problems connect.

A lot of research improves one axis at a time. This thesis asks a more practical question: what would a segmentation system need in order to stay useful when the labels are few, the domains keep changing, and the model must not forget what it already knows?

That leads naturally to UFSeg, which feels less like a final chapter and more like the thesis earning its title.

---

## Closing thoughts

**Continual Foreground Segmentation with Limited Data** is a thesis about making segmentation systems more realistic, not just more accurate. It pushes on boundary quality, data efficiency, continual learning, and unified design at the same time.

The central idea is simple but powerful: a strong vision model should not need perfect conditions to remain strong. It should learn from limited data, adapt over time, retain what it already knows, and still produce precise foreground masks when the world gets harder.
