---
title: "Credit Risk Rating Project at Scotiabank"
slug: "credit-risk-rating-project"
year: 2022
period: "2022"
subtitle: "Sparse-data reconstruction and internal-grade prediction for banking credit workflows."
summary: "A deep learning pipeline that reconstructs missing credit-risk information and predicts suggestive internal grades for General Industries and Regional Portfolio review."
featured: false
tags: ["Finance", "Credit Risk", "Sparse Data", "Tabular Deep Learning"]
stack: ["Python", "Deep Learning", "Tabular Data", "Risk Modeling"]
impact: "Designed and developed a sparse-data reconstruction and credit-risk rating pipeline tailored to messy enterprise banking data and analyst review workflows."
cover: "/images/projects/credit-risk-rating-thumbnail.jpg?v=20260406-credit"
order: 8
---

# Credit Risk Rating Project

## Building a Deep Learning Pipeline for Sparse Credit Risk Data

One of the most interesting industry projects I worked on was a **Credit Risk Rating** project at **Scotiabank**. The core challenge was not simply training a classifier. The real challenge was building a system that could learn from **high-dimensional, sparse, messy, mixed-type banking data** and still produce a practical, reviewable recommendation for a customer's **internal grade (IG)**.

This project sat at the intersection of **machine learning, tabular data engineering, missing-data reconstruction, and risk modeling**. The end goal was to support the **General Industries and Regional Portfolio** by generating **suggestive internal grades** for potential customers. These recommendations were designed to help banking and credit teams scale their review process, while still keeping the final decision under expert human control.

<figure>
  <img
    src="../../images/projects/credit-risk-rating-pipeline.jpg?v=20260406-credit-pipeline"
    alt="Credit risk rating pipeline from sparse raw banking data through cleaning, preprocessing, sparse-data reconstruction, credit risk classification, held-out testing, and suggested internal grade review."
  />
  <figcaption>
    End-to-end sparse-data reconstruction and credit risk rating pipeline, from raw banking portfolio files to suggested internal grades for analyst review.
  </figcaption>
</figure>

---

## Problem

The dataset contained company-level credit information distributed across **four CSV files**, each with roughly **3,000 samples** and around **468 input features plus the target variable**. The target was **`Final_Authorized_IG_Notch`**, a multi-class categorical output representing the customer's internal credit grade.

At first glance, this sounds like a standard tabular classification problem. In practice, it was much harder for four reasons:

1. **Extreme sparsity**  
   Many features were missing for many customers. Some variables were available only for certain industries, regions, or underwriting cases, which created a very sparse feature matrix.

2. **Mixed data types**  
   The data included numerical variables, categorical variables, dates, strings, and special codes. A single model-ready representation had to unify all of them.

3. **Corrupted entries**  
   Real banking data contained invalid and noisy values such as `na`, `inf`, `-inf`, blanks, inconsistent categories, and fields that behaved more like metadata than predictive inputs.

4. **Large differences in feature scale**  
   Some variables were bounded between small ranges like `[0, 10]`, while others spanned very large positive or signed ranges. Without careful treatment, a model could easily over-weight the wrong signals.

The business objective was clear: build a model that could take these inputs and predict a **recommended internal grade**, while remaining useful for real-world credit workflows where **human review and override** are part of the process.

---

## My Role

I was responsible for designing and developing the modeling pipeline, with a strong focus on two technical goals:

1. **Overcoming data sparsity by reconstructing missing information**
2. **Predicting the customer’s credit risk internal grade from selected risk factors**

In practice, this meant building more than just a classifier. I designed a **two-stage deep learning solution**:

- a **sparse-data reconstruction model** to recover useful latent structure from incomplete records
- a **credit risk rating model** that used the cleaned and enriched representation to predict the final IG notch

I also worked on the broader pipeline around the models: preprocessing, feature handling, training/test split usage, and the logic needed to produce outputs that were useful to downstream banking teams.

---

## Approach

## 1) Data understanding and audit

The first step was to treat the project as a **data quality and representation problem**, not only a modeling problem.

I started by auditing the raw files to understand:

- which columns were consistently populated
- which features were sparse but still potentially valuable
- which columns were effectively unusable
- how the target distribution was spread across IG classes
- which variables represented numeric, categorical, date, or free-text style values

This step was important because sparse enterprise data often contains features that are individually weak but jointly useful. Dropping all sparse columns too aggressively can destroy business signal, while keeping everything without structure can make the model unstable.

---

## 2) Preprocessing pipeline

I designed the preprocessing pipeline to convert raw heterogeneous customer records into a structured learning representation.

### a) Cleaning corrupted entries
I normalized invalid markers such as:
- `na`
- empty strings
- `inf`
- `-inf`
- inconsistent categorical codes

This produced a consistent missing-value representation before any downstream modeling.

### b) Type-aware feature handling
Different columns required different treatment:

- **numerical features** were cleaned, clipped where needed, and scaled
- **categorical features** were encoded into model-friendly representations
- **date-like variables** were converted into usable temporal features
- **string / identifier-like fields** were either excluded, normalized, or converted only if they carried predictive value

### c) Feature scaling
Because the variables existed on very different numerical ranges, I used a normalization strategy that reduced scale imbalance without erasing business meaning. This is essential in tabular risk problems, where a variable with a huge raw magnitude should not dominate the model simply because of its units.

### d) Feature selection and sample selection
I did not assume that every feature and every sample should always be used. Part of the work was evaluating whether:
- some columns were too sparse or noisy to justify inclusion
- some samples would degrade training more than help it
- a smaller but cleaner feature set could outperform the full raw input space

This made the final pipeline more robust and more aligned with business use.

---

## 3) Sparse-data reconstruction model

A major technical contribution in this project was designing a deep learning model specifically to handle sparse records by **reconstructing missing parts of the input**.

Conceptually, this stage acted like a **representation learner / imputation-aware encoder**:

- it took incomplete customer records as input
- learned the relationships among observed risk factors
- reconstructed or inferred the missing components in latent form
- produced a denser representation for downstream prediction

Instead of treating missingness as a simple nuisance to patch with mean imputation or row deletion, this model attempted to **learn structure from partially observed patterns**. In a banking dataset, many variables are correlated through financial condition, industry context, group relationships, and portfolio behavior. A reconstruction model can capture some of that structure better than manual rules.

### Why this mattered
This stage helped address the central weakness of the raw dataset:

- sparse records become more informative
- downstream classification becomes more stable
- the model can exploit cross-feature dependencies rather than relying only on directly observed values

In other words, the reconstruction stage turned incomplete inputs into a more useful learned feature space.

---

## 4) Credit risk rating model

On top of the cleaned and enriched inputs, I designed a **deep learning classification model** to predict **`Final_Authorized_IG_Notch`**.

This model was tailored to the structure of the problem:

- tabular multi-factor customer input
- multi-class target prediction
- heterogeneous feature interactions
- sensitivity to sparse and partially observed data
- deployment setting where the output is a **suggestive rating**, not an autonomous final decision

The classifier consumed either:
- the full processed feature set, or
- a selected subset of the most informative features

Depending on the experiment, the model could use the reconstructed representation directly, concatenate it with curated raw features, or operate on a compressed latent embedding designed to improve robustness.

### Design goals of the classifier
The model was designed to:
- capture non-linear relationships among credit risk factors
- generalize across **General Industries** and **Regional Portfolio** cases
- remain stable despite sparsity and mixed data quality
- produce rankings that are useful for credit review teams

---

## 5) End-to-end pipeline

The full project pipeline can be summarized as:

1. **Load the four portfolio files**
2. **Clean corrupted values and standardize missingness**
3. **Separate variables by type**
4. **Encode categorical/date/numerical features**
5. **Scale and normalize the usable inputs**
6. **Optionally prune weak or harmful features/samples**
7. **Train a deep reconstruction model for sparse data**
8. **Generate enriched / latent representations**
9. **Train a multi-class credit rating classifier**
10. **Test on the held-out fourth file**
11. **Produce suggested IG notches for review**
12. **Support analyst override and downstream credit workflows**

This framing made the system more than just a machine learning experiment. It became a practical **decision-support pipeline**.

---

## Tools

The exact stack can vary by implementation, but the project naturally fits a workflow centered on:

- **Python**
- **Pandas / NumPy** for data wrangling
- **scikit-learn** for preprocessing, baselines, encoding, and evaluation utilities
- **PyTorch or TensorFlow/Keras** for the deep learning models
- **Jupyter / notebooks** for exploration and prototyping
- **Matplotlib / Seaborn / Plotly** for diagnostics and class-distribution analysis
- **Excel / CSV-based data interfaces** for collaboration with business stakeholders

From an engineering perspective, the critical tools were not only the modeling libraries, but also the data inspection and preprocessing utilities needed to make enterprise risk data usable.

---

## Outcomes

This project produced a complete learning pipeline for a difficult real-world credit problem.

### Technical outcomes
- Built a preprocessing workflow for **sparse, heterogeneous, partially corrupted tabular data**
- Designed a **deep reconstruction model** to recover useful structure from missing inputs
- Designed a **deep classification model** for predicting internal credit grades
- Structured the pipeline around a realistic **train/test split across four files**
- Framed the output as a **reviewable recommendation** rather than a black-box replacement for expert judgment

### Business outcomes
- Supported the goal of scaling credit assessment for the **General Industries and Regional Portfolio**
- Enabled generation of **suggestive internal grades** for potential customers
- Aligned model outputs with a credit workflow where **banking teams and credit teams can review or override recommendations**
- Contributed to a process in which final authorized grades can feed into **credit decisions and PD calibration**

---

## Why this project mattered

What made this project especially valuable was that it addressed a very realistic industry problem: **useful prediction is impossible without solving the data representation problem first**.

In many enterprise settings, the biggest challenge is not choosing a classifier architecture. It is learning how to:
- clean inconsistent records,
- preserve weak but meaningful signals,
- handle structured missingness,
- and produce outputs that fit real operational workflows.

This project forced exactly that kind of thinking. The result was a system that combined **deep learning**, **tabular data engineering**, and **risk decision support** in a single pipeline.

---

## Final reflection

I see this project as a strong example of applied machine learning in finance: a case where the best solution was not a generic model, but a pipeline carefully designed around the realities of the data and the needs of the business.

The key idea was simple but powerful:

> before predicting credit risk well, the model must first learn how to make sense of incomplete customer information.

That combination of **sparse-data reconstruction** and **credit grade prediction** is what made the project technically interesting and practically useful.
