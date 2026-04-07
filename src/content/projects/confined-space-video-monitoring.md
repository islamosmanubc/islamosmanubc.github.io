---
title: "Confined Space Video Monitoring"
slug: "confined-space-video-monitoring"
year: 2021
period: "2021"
subtitle: "AI-assisted monitoring, worker counting, and entry/exit logging for industrial confined spaces."
summary: "A smart multi-camera safety system for confined-space operations that prioritizes active feeds, counts workers, tracks entry and exit, and integrates with industrial analytics workflows."
featured: false
tags: ["Industrial Safety", "Computer Vision", "Monitoring", "Analytics"]
stack: ["Python", "Computer Vision", "Real-time Monitoring", "Database Logging"]
impact: "Built intelligent monitoring and occupancy-tracking components that turned confined-space camera feeds into searchable safety and operational data."
cover: "/images/projects/confined-space-video-monitoring-thumbnail.jpg?v=20260406-csvm"
order: 9
---

# Confined Space Video Monitoring

## Confined Space Video Monitoring: Building a Smarter Safety Layer for Industrial Turnarounds

Industrial confined spaces are among the highest-risk work environments in maintenance operations. They require strict control over who enters, who exits, how many workers are inside, and whether a control room can maintain constant visibility and communication. During my work with **Irwin’s Safety & Industrial Labour Services** in 2021, I worked on a project that turned this requirement into a practical computer-vision and monitoring system: **Confined Space Video Monitoring**.

This project sat at the intersection of **computer vision**, **industrial safety**, **real-time systems**, and **operational analytics**. The goal was not simply to view cameras. The goal was to build an intelligent monitoring workflow that could reduce manual overhead, improve safety, and generate structured operational data that could be integrated into **Irwin’s Industrial Analytics™** platform.

<figure>
  <img
    src="../../images/projects/confined-space-video-monitoring-pipeline.jpg?v=20260406-csvm-pipeline"
    alt="Confined space video monitoring pipeline from access-point cameras and local wireless networking through live monitoring, motion-aware feed prioritization, human detection, worker counting, entry and exit logging, structured data storage, and control-room analytics."
  />
  <figcaption>
    End-to-end confined-space monitoring pipeline, from live edge-site cameras through intelligent monitoring, worker counting, entry and exit logging, and Industrial Analytics integration.
  </figcaption>
</figure>

## Problem

Traditional confined-space monitoring relies heavily on human attendants stationed near access points. That model is costly, difficult to scale, and limited in the amount of consistent structured data it can produce. Irwin’s requirements made the problem even more interesting:

- the system had to support **real-time monitoring of entries and exits**
- the control room had to track **who is inside which confined space**
- operators needed a dashboard that could **search by person or access door**
- the interface had to support **many simultaneous doors and camera feeds**
- the network had to work on a **local wireless mesh**, with **no reliance on public internet**
- the solution needed to help **reduce client cost** while improving safety
- the resulting entry/exit data needed to feed **Industrial Analytics™** for downstream efficiency analysis

The attached project documents also show that the system was intended to scale well beyond a toy prototype: the dashboard requirements discussed support for **up to 300 doors**, motion-driven camera prioritization, grouped control rooms, and real-time occupancy status. The same documents also make clear that the system had to log worker identity, entry/exit events, and camera activity in a way that supported both compliance and operational reporting.

In short, the challenge was to build a system that could function like a **centralized AI-assisted safety control room** rather than a passive CCTV viewer.

## My Role

I worked on the project for about **8 months** and contributed to the core intelligent software layer. My responsibilities included:

- developing a **smart camera monitoring system** that displayed all camera streams in a network while automatically emphasizing cameras with higher motion activity
- developing and integrating a **human detection model** to count the number of workers inside each confined space
- comparing observed occupancy against the **expected worker count**
- developing an **autonomous entry/exit logging workflow** to pull worker movement events for different confined spaces and store them in a database
- integrating the developed monitoring components into **Irwin’s Industrial Analytics™** ecosystem so that safety events and occupancy information could become useful operational data

This role required both **computer vision model development** and **system integration**, because the real challenge was not just detecting people in images, but turning detections into trustworthy operational signals.

## Approach

## 1. Smart camera monitoring layer

The first part of the system was the operator-facing monitoring dashboard. Instead of forcing the control room to treat every camera equally, the monitoring layer prioritized feeds with meaningful activity.

The idea was simple but operationally valuable: if a confined-space site has many cameras, operators need help deciding **where to look first**. I designed the monitoring logic so that the system could:

- ingest multiple live camera streams across a local network
- evaluate motion intensity or activity level across feeds
- surface the most active or relevant feeds more prominently
- maintain visibility of the broader camera grid
- support centralized oversight of multiple confined spaces from a control room

This aligns closely with the attached requirements, which called for visual representation of multiple doors, automatic replacement of inactive feeds by active ones, customizable channel names, motion-activated emphasis, and multi-screen control-room workflows.

## 2. Human detection and worker counting

A second key layer was the **human detection model**. The purpose was not only to detect people in video, but to convert detections into a practical occupancy signal for each confined space.

The detection stage was designed to:

- identify workers in the incoming video stream
- count detected people per confined space or camera view
- associate that count with the relevant monitored area
- compare the observed count against the expected workforce count
- flag occupancy mismatches for operator review

This made the system more useful than a standard camera viewer. Instead of asking an operator to manually interpret every stream, the software could expose a direct safety question:

**How many workers should be inside this space, and how many do we currently observe?**

That comparison becomes especially important in confined spaces where accountability and rapid incident response matter.

## 3. Autonomous entry/exit event extraction

Video monitoring alone is useful, but compliance and analytics require structured event records. To address that, I developed an autonomous workflow for pulling worker entry and exit events for different confined spaces and storing them in a database.

At a high level, the event pipeline was designed around:

- identifying access-point activity
- associating a worker event with the relevant door / confined space
- determining whether the event represents an **entry** or **exit**
- recording the timestamp and worker identity when available from the wider system context
- saving the event in a database for later reporting and analytics

This direction matches the requirements documents, which emphasized continuous real-time monitoring of entry and exit events, searchable by person and access door, with a real-time status indicator showing whether a worker is currently inside or outside. It also aligns with the broader Industrial Analytics work, where an **entry-event-based** representation was used to produce more meaningful operational insights.

## 4. Integration with Industrial Analytics™

A major strength of the project was that it was not built as an isolated demo. The monitoring outputs were designed to supplement **Irwin’s Industrial Analytics™**, an internal system used to analyze tool time, inefficient time, and project execution quality during industrial turnarounds.

That meant the work had to be integrated with a broader operational data model, including:

- confined-space identifiers
- facility / location context
- worker presence records
- time-based event streams
- control-room and monitoring observations
- downstream analytics and reporting

The supporting documents also describe the broader data strategy around normalization, relational storage, and improving data integrity by moving away from ad hoc spreadsheet handling. In practice, this meant the video monitoring system was part of a larger push toward **structured, machine-readable industrial safety data**.

## 5. Full pipeline design

From a system perspective, the project can be understood as a full pipeline:

1. **Acquire live video** from networked cameras at confined-space access points  
2. **Stream feeds to a control room dashboard** over a local wireless network  
3. **Measure motion/activity** to prioritize camera attention  
4. **Run worker detection** on relevant frames  
5. **Count workers** per monitored space  
6. **Compare live count against expected count**  
7. **Extract entry/exit events** from access-point activity  
8. **Store events and occupancy signals** in a structured database  
9. **Send operational data to Industrial Analytics™** for reporting, efficiency analysis, and decision support  

This pipeline helped connect three important layers that are often separated in practice:

- **live safety monitoring**
- **computer vision inference**
- **structured operational analytics**

## Tools and Technologies

The attached requirements and issue reports highlight that this project sat in a real hardware/software environment rather than a purely academic prototype. The overall stack involved a mix of:

- **computer vision / deep learning** for human detection
- **real-time video streaming**
- **multi-camera dashboarding**
- **database-backed event logging**
- **local wireless / mesh networking**
- **access control and door event infrastructure**
- **integration with Industrial Analytics™**
- commercial video-management and networking components in the deployment environment, including references to **AXIS Camera Station VMS**, **Ubiquiti / UniFi networking**, access terminals, and wireless repeaters in the project documents

Because the deployment context mattered so much, part of the engineering challenge was making the AI components useful under real industrial constraints such as bandwidth, camera configuration, hardware limits, and reliability under live multi-person activity.

## Outcomes

The project produced more than a prototype viewer. It established a practical architecture for **AI-assisted confined-space monitoring**.

Key outcomes included:

- a **smart multi-camera monitoring workflow** with activity-aware feed prioritization
- a **human detection and counting capability** for confined spaces
- an **automated entry/exit data extraction path**
- **database-backed event records** that could be used for traceability and reporting
- integration with **Industrial Analytics™**, allowing safety-monitoring signals to contribute to broader efficiency and turnaround analysis
- a foundation for reducing manual monitoring overhead and improving control-room situational awareness

The attached materials also make clear that this was a genuine field-oriented system, not a purely offline model. They document ambitious control-room scaling goals, lower-cost operation versus manned alternatives, and the realities of live deployment, including network instability, camera configuration issues, and host hardware limitations observed during a demonstration. Those lessons are important because they show the project tackled the hardest part of industrial AI systems: **working outside the lab**.

## Why this project mattered

What made this project meaningful was the combination of **safety impact** and **systems thinking**. The value was not in detecting a person on a single frame. The value was in turning real-time video, access activity, and operational context into an integrated monitoring workflow that could help answer practical questions such as:

- Who is inside this confined space right now?
- Does the observed count match the expected crew size?
- Which access points or camera views need immediate operator attention?
- Can we convert safety events into structured data for compliance and efficiency analysis?

That is the kind of problem where computer vision becomes genuinely useful: when it is embedded in a larger operational pipeline and helps people make safer, faster, and more informed decisions.

## Summary

The **Confined Space Video Monitoring** project was a real-world industrial AI system focused on centralized monitoring of confined spaces. My work covered the intelligent software layer: activity-aware camera monitoring, worker detection and counting, autonomous entry/exit extraction, database logging, and integration with Industrial Analytics™.

It was a strong example of how applied computer vision can move beyond model accuracy alone and become part of an operational product that supports **worker safety, compliance, and industrial decision-making**.
