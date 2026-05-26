---
name: domain-discovery
description: 'Use when analyzing an epic to extract domain context, personas, goals, business rules, and constraints before writing user stories.'
argument-hint: 'Provide epic text or a file path and optional domain assumptions.'
---

# Domain Discovery

Use this skill before story generation to avoid shallow or product-specific assumptions.

## When To Use
- Epic is broad, ambiguous, or domain-heavy.
- You need to identify actors, outcomes, and rules from unstructured text.
- You are creating domain-agnostic stories from a new problem space.

## Procedure
1. Parse the epic and list explicit goals and outcomes.
2. Identify personas/actors and what each one values.
3. Extract business rules, constraints, and compliance needs.
4. Identify assumptions, dependencies, and open questions.
5. Produce a short domain summary for story creation.

## Output Checklist
- Personas list
- Business outcomes list
- Constraints/rules list
- Risks/dependencies list
- Clarification questions list

## Quality Gates
- Do not infer implementation details as business requirements.
- Flag missing information instead of guessing.
- Keep language generic to the input domain.
