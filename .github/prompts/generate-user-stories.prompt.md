---
name: Generate User Stories
description: "Generate domain-agnostic user stories from an epic with acceptance criteria and JIRA title checks."
argument-hint: "Epic source (path/text), story count, and optional JIRA title regex"
agent: "user-story-generator"
---

Generate user stories from the provided epic.

Inputs:
- Epic source: ${input:Epic source (for example @udemy_epic.txt or pasted text)}
- Story count: ${input:Story count (default 5)}
- Optional domain context: ${input:Domain context (optional)}
- Optional JIRA title regex: ${input:JIRA title regex (optional)}

Requirements:
1. Use a generic process that is not tied to a specific product domain.
2. Apply domain discovery before writing stories.
3. Produce each story in this format:
   - Story Title
   - User Story (As a / I want / So that)
   - Acceptance Criteria (Given/When/Then)
   - Assumptions
   - Dependencies
4. Validate titles against the provided JIRA naming regex.
5. If regex is missing, ask for it and temporarily use: ^US-[A-Z]+-[0-9]{3}: .+
6. If the epic is ambiguous, ask clarifying questions first.
