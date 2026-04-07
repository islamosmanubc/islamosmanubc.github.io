---
title: "CT Scanner Quality Control"
slug: "ct-scanner-quality-control"
year: 2023
period: "2023"
organization: "InteriorHealth"
subtitle: "Self-supervised vision transformers for scanner calibration quality assessment."
summary: "A medical-imaging QC system that uses self-supervised pretraining and vision transformers to improve generalization in scanner calibration assessment."
featured: true
tags: ["Medical Imaging", "Vision Transformers", "Self-supervised Learning", "Quality Control"]
stack: ["Vision Transformers", "Self-supervised Learning", "Medical Imaging"]
impact: "Delivered a 12% improvement over standard baselines and supported publication and intellectual-property outcomes."
cover: "/images/projects/ct-scanner-quality-control.jpeg?v=20260406-ct"
order: 5
---

# Building MedicalQC: A Practical Quality-Control Pipeline for CT and MRI

Medical imaging systems are expected to be reliable, but scanner quality can drift quietly over time. A small calibration issue, a protocol mismatch, or a site-specific artifact can degrade image quality long before the problem is obvious to a human reviewer. In practice, that creates a hard problem: how do you monitor scanner performance continuously, across hospitals, without centralizing sensitive patient data?

That is the gap this repository is designed to address. `MedicalQC` is a research-focused codebase for automated quality control of CT and MRI studies, with an emphasis on federated learning, domain generalization, uncertainty-aware predictions, and reproducible experimentation.

> Placeholder for Figure 1: End-to-end MedicalQC pipeline.  
> Suggested visual: study ingestion -> slice preprocessing -> Swin encoder + spectral FFT branch -> MIL aggregation -> QC prediction + uncertainty -> federated aggregation across hospitals with private LoRA adapters.

## Problem

Traditional scanner quality control is often manual, periodic, and operationally expensive. That makes it hard to catch subtle failures early, especially when image quality issues vary by scanner vendor, acquisition protocol, hospital workflow, or patient population. A model trained in one site can also break down when it sees a new site with a different data distribution.

This repo tackles that real-world failure mode directly: build a QC system that works on full CT/MRI studies, generalizes across hospitals, and preserves privacy by keeping hospital data local.

## Role

The role of this project is not just to train a classifier. It acts as the full research-engineering backbone for the problem:

- modeling scanner QC as a study-level decision task rather than a single-slice task
- simulating centralized and federated training workflows
- separating shared model knowledge from site-specific adaptation
- tracking experiments and configuration for reproducibility
- leaving a path toward deployment through study inference and a service stub

In other words, the repository plays the role of both experimentation platform and deployment scaffold for medical image QC.

## Approach

The pipeline is built around the idea that scanner failures show up in multiple ways. Some issues are visible in anatomy and structure; others are easier to detect in frequency-space patterns such as noise texture or acquisition artifacts. MedicalQC therefore combines multiple signals instead of relying on a single image representation.

At the model level, each slice is encoded with a Swin Transformer backbone, while a separate spectral branch extracts FFT-derived features. Those features are fused and then aggregated across slices using a multiple-instance learning setup so the model can make a study-level quality decision. That matters because CT and MRI scans are not single images; they are stacks, and a scanner problem may only affect part of the study.

The repo also treats reliability as a first-class concern. Rather than forcing a binary pass/fail output with no context, the model is designed to support uncertainty-aware behavior so questionable cases can be escalated for review.

The federated learning setup is the most distinctive architectural choice. Shared model parameters are aggregated across hospitals, while site-specific LoRA adapters stay private to each institution. That design aims to capture common scanner-quality patterns without erasing the local quirks that make one hospital different from another.

## Tools

The implementation stack is straightforward and pragmatic:

- **PyTorch** and **timm** for model development, including the Swin-based encoder
- **Hydra** and **OmegaConf** for structured configuration and repeatable experiment runs
- **MLflow** for experiment tracking, artifacts, metrics, and reproducibility logs
- **NumPy**, **SciPy**, and custom preprocessing utilities for study and slice handling
- **FastAPI** as a lightweight path toward service integration
- **pytest**, **ruff**, **black**, and **mypy** for testing, linting, and code quality

From a system-design perspective, the codebase is organized around the actual lifecycle of the work: data ingestion, model components, federated training, evaluation, inference, and utilities for logging and plots. That makes the repository useful not only for a paper prototype, but also for iterative engineering.

## Outcomes

The main outcome of this project is a working framework for privacy-preserving scanner QC research that can be trained centrally or in federated simulation. It provides:

- a study-level QC pipeline for CT and MRI
- support for unseen-hospital evaluation
- a mechanism for private local adaptation through LoRA adapters
- reproducible training and evaluation workflows
- inference utilities that move the project closer to deployment

Just as importantly, the repository frames QC as an operational ML problem rather than a narrow benchmark task. The value is not only model accuracy; it is the combination of privacy, generalization, confidence-aware behavior, and experiment traceability. That is what makes the project useful in a real multi-site medical imaging setting.

## Closing Thought

What makes `MedicalQC` interesting is that it sits at the intersection of machine learning, healthcare operations, and deployable systems design. The repo is less about chasing a single model score and more about building a credible quality-control workflow for environments where reliability, privacy, and cross-site robustness all matter at once.
