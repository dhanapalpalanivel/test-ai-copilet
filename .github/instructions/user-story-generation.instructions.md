---
description: "Use when generating user stories from epics. Enforces generic domain analysis, consistent story format, and JIRA-ready naming checks."
name: "User Story Generation Rules"
---

# User Story Generation Rules

## Scope
- Apply for epic-to-story generation workflows.
- Keep output domain-agnostic unless the epic explicitly defines domain details.

## Required Story Structure
1. Story Title
2. User Story (As a / I want / So that)
3. Acceptance Criteria (Given/When/Then)
4. Assumptions
5. Dependencies

## Writing Rules
- Focus on user value and business outcome.
- Avoid implementation details in the user story statement.
- Ask clarifying questions when required details are missing.
- Keep language concise and backlog-ready.

## Naming Rules
- Validate each Story Title against the configured JIRA naming regex.
- If regex is unavailable, request one and use default: ^US-[A-Z]+-[0-9]{3}: .+
- For invalid names, provide corrected alternatives.
