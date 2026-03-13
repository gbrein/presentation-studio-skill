# Phase Handoff Reference

Defines the data format flowing between pipeline phases and the mapping rules that convert storylines into slide designs.

---

## Table of Contents

1. [Phase 1 Output: Storyline Package](#phase-1-output-storyline-package)
2. [Phase 2 Input Enrichment](#phase-2-input-enrichment)
3. [Storyline-to-Slide Pattern Mapping](#storyline-to-slide-pattern-mapping)
4. [Handling Partial Pipeline Runs](#handling-partial-pipeline-runs)

---

## Phase 1 Output: Storyline Package

Phase 1 (strategic-storytelling) produces a Storyline Package. This is the artifact the user reviews at Checkpoint 1.

```markdown
# STORYLINE PACKAGE
━━━━━━━━━━━━━━━━━━━

## Presentation
- **Title**: [Presentation title]
- **Date**: [Target date]
- **Duration**: [e.g., "30 min + 15 min Q&A"]

## Audience Empathy Map
- **Audience**: [Roles, seniority, decision power]
- **They think**: [Current mental model]
- **They feel**: [Emotional state]
- **They want**: [Desired outcome]
- **They fear**: [Risk or concern]
- **Desired shift**: [From → To]
- **Decision needed**: [Specific action/approval]

## Core Message
[One sentence — the governing thought]

## Storyline
[Arc]     #  | Action Title                                    | Exhibit Hint
----------|--------------------------------------------------|------------------
HOOK      |  1. [Provocative opening]                        | [visual suggestion]
CONTEXT   |  2. [Shared understanding]                       | [visual suggestion]
CONTEXT   |  3. [Challenge framing]                          | [visual suggestion]
RISING    |  4. [Key Argument A]                             | [visual suggestion]
RISING    |  5. [Deepening A]                                | [visual suggestion]
RISING    |  6. [Key Argument B]                             | [visual suggestion]
RISING    |  7. [Deepening B]                                | [visual suggestion]
RISING    |  8. [Key Argument C]                             | [visual suggestion]
CLIMAX    |  9. [Core message full force]                    | [visual suggestion]
CLIMAX    | 10. [Quantified impact]                          | [visual suggestion]
RESOLUT.  | 11. [Roadmap]                                    | [visual suggestion]
RESOLUT.  | 12. [Investment]                                 | [visual suggestion]
RESOLUT.  | 13. [Risk mitigation]                            | [visual suggestion]
CTA       | 14. [Decision + timeline]                        | [visual suggestion]
```

**Arc**: `HOOK`, `CONTEXT`, `RISING`, `CLIMAX`, `RESOLUT.`, `CTA`

**Action Title**: Complete sentence stating the slide's takeaway. Becomes the literal action title on the HTML slide.

**Exhibit Hint**: Guidance for Phase 2. Examples: "bar chart Q1-Q4", "3 KPIs", "2x2 matrix", "timeline 3 phases", "customer quote", "before/after process". Suggestions, not mandates.

---

## Phase 2 Input Enrichment

Before building slides, Phase 2 adds two layers on top of the approved storyline:

### Visual Configuration

Selected through the interactive palette/font flow:

```markdown
## Visual Configuration
- **Palette**: [e.g., "Teal Trust"]
- **Heading font**: [e.g., "Source Serif 4"]
- **Body font**: [e.g., "Source Sans 3"]
- **Custom colors**: [hex codes if provided]
- **Density**: [Projected / Leave-behind / Analytical]
```

### Slide Plan

Maps each storyline item to a specific HTML pattern:

```markdown
## Slide Plan
#  | Action Title                    | Slide Pattern          | Key Exhibit
---|--------------------------------|------------------------|------------------
 1 | [From storyline]               | cover                  | —
 2 | [From storyline]               | section-divider        | —
 3 | [From storyline]               | big-number             | 3 KPIs
 4 | [From storyline]               | chart-bar              | Q1-Q4 revenue
 5 | [From storyline]               | explanatory-sidebar    | text + metric
...
```

Present the slide plan briefly before building: "Vou usar esses layouts — tudo bem?" Quick confirmation, not formal approval.

---

## Storyline-to-Slide Pattern Mapping

Default mapping from narrative arc position to slide type. Override when exhibit hints or content signals suggest a better pattern.

### HOOK (typically slide 1)
- **Default**: `cover`
- If hook is a data provocation → `big-number` as slide 2 right after cover
- If hook is a question → cover with question as subtitle

### CONTEXT (typically slides 2-3)
- **Default**: `section-divider` → `explanatory-sidebar` or `definition`
- If context includes baseline data → `chart-bar` or `chart-line`
- If context is shared understanding → `exec-summary` or `explanatory-split`

### RISING TENSION (typically slides 4-8)
Most visual variety should occur here. Alternate between:
- **Data arguments**: `chart-bar`, `chart-line`, `chart-donut`, `table-comparison`
- **Conceptual arguments**: `framework-matrix`, `explanatory-sidebar`, `icon-cards`
- **Comparative arguments**: `before-after`, `two-column-contrast`
- **Evidence/voice**: `quote-highlight`, `scorecard`

**Layout variation rule**: Never use the same pattern for two consecutive RISING slides.

### CLIMAX (typically slides 9-10)
- **Default**: `big-number` or `exec-summary`
- If recommendation → `pillar-columns` or `explanatory-split`
- If transformation vision → `before-after` or `pyramid`

### RESOLUTION (typically slides 11-13)
- Roadmap → `timeline`
- Investment → `table-comparison` or `chart-bar`
- Team/resources → `icon-cards` or `scorecard`
- Risk mitigation → `two-column-contrast`
- Financial impact → `big-number`

### CALL TO ACTION (final slide)
- **Default**: `closing`
- If specific decisions → closing with structured next-steps list
- If single ask → closing with one bold statement

---

## Content-to-Slide Matching Rules

When exhibit hints are absent or vague, use content signals to pick the right pattern:

| Content Signal | Slide Type |
|---------------|------------|
| 1 big number + context | `big-number` |
| 3-5 numbered findings | `exec-summary` |
| Time-series data | `chart-line` or `chart-bar` |
| "X vs Y" comparison | `before-after` or `two-column-contrast` |
| Percentage breakdown | `chart-donut` |
| Process steps | `diagram-flow` or `timeline` |
| 2 dimensions of analysis | `framework-matrix` |
| Long explanation with sub-topics | `explanatory-sidebar` |
| 3-6 parallel sub-components | `icon-cards` or `pillar-columns` |
| Quote or testimonial | `quote-highlight` |
| Pros/cons or binary comparison | `two-column-contrast` |
| Concept definition | `definition` |
| Items with status/progress | `scorecard` |
| Mixed: explanation + data | `explanatory-split` |

---

## Handling Partial Pipeline Runs

### User already has a storyline

1. Map their content to the Storyline Package format
2. Extract action titles, infer arc positions, generate exhibit hints
3. Present at Checkpoint 1 for validation
4. Proceed to Phase 2 on approval

### User only wants specific slides

1. Skip Phase 1
2. Ask for action title and content per slide
3. Apply content-to-slide matching
4. Build and present — Checkpoint 2 only

### User wants to change storyline after seeing slides

1. Return to Storyline Package, apply changes
2. Re-present at Checkpoint 1
3. Re-map slide types for affected slides only
4. Regenerate changed slides, keep approved ones
5. Re-present at Checkpoint 2

---

## Phase 3: HTML → PPTX Conversion

### Input

Phase 3 receives:
- A directory of approved `slide-XX.html` files
- The visual configuration (palette, fonts) embedded in each slide's CSS `:root`
- Optionally, a `manifest.json` from a previous conversion run (for change detection)

### Conversion Scope Decision

Before running the script, ask the user what to convert:
- **Full deck**: All slides, fresh conversion
- **Only changed**: Uses manifest to detect which `.html` files changed since last run
- **Specific slides**: User provides explicit slide numbers

### Output

- A single `.pptx` file in `/mnt/user-data/outputs/`
- A `manifest.json` saved alongside for future incremental runs

### Script Reference

```bash
# Full conversion
node scripts/html2pptx.js --input <slides-dir> --output <file.pptx>

# Incremental (only changed slides)
node scripts/html2pptx.js --input <slides-dir> --output <file.pptx> --manifest <prev-manifest.json>

# Specific slides
node scripts/html2pptx.js --input <slides-dir> --output <file.pptx> --only 3,7,12

# With metadata
node scripts/html2pptx.js --input <slides-dir> --output <file.pptx> --title "Title" --author "Name"
```
