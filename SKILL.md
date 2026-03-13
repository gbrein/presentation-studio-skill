---
name: presentation-studio
description: End-to-end pipeline for executive presentations — from raw ideas to .pptx. Three phases with interactive checkpoints. Phase 1 builds a strategic storyline (Design Thinking + Pyramid Principle + MECE). Phase 2 creates consulting-grade HTML slides (1280x720px, Chart.js). Phase 3 converts to .pptx via semantic parsing (pptxgenjs) with Puppeteer screenshot fallback. Use when the user wants to create a full presentation, build a deck, or turn ideas into slides. Trigger on "presentation", "deck", "apresentação", "presentation studio", "studio", "full deck", "create slides". Handles the FULL journey — storyline, design, conversion. If the user only says "make me a presentation about X", run the full pipeline.
---

# Presentation Studio

End-to-end pipeline for executive presentations. Takes raw ideas, structures them into a strategic storyline, then produces polished consulting-grade HTML slides — with interactive checkpoints between each phase.

This is a **self-contained skill**. All methodology, design systems, and slide patterns are bundled in the references folder. No external skills required.

## Pipeline Overview

```
┌─────────────────┐  checkpoint  ┌─────────────────┐  checkpoint  ┌─────────────────┐
│   PHASE 1       │ ── review ─→ │   PHASE 2       │ ── review ─→ │   PHASE 3       │
│   STORYLINE     │   & adjust   │   SLIDE DESIGN  │   & adjust   │   HTML → PPTX   │
└─────────────────┘              └──────────────────┘              └─────────────────┘
```

## Reference Files — Read Before Each Phase

| Phase | What to read | File |
|-------|-------------|------|
| **Phase 1** | Storyline methodology (Design Thinking + Pyramid + MECE) | [references/strategic-storytelling.md](references/strategic-storytelling.md) |
| **Phase 1→2** | Handoff format, slide type mapping, partial pipeline rules | [references/phase-handoffs.md](references/phase-handoffs.md) |
| **Phase 2** | CSS variables, palettes, typography, Chart.js defaults | [references/design-system.md](references/design-system.md) |
| **Phase 2** | HTML patterns for all 25 slide types | [references/slide-patterns.md](references/slide-patterns.md) |
| **Phase 3** | Conversion script usage | [Phase 3 section below](#phase-3-html--pptx-conversion) |

**Always read the relevant reference files before starting a phase.** The SKILL.md you're reading now is the orchestrator — it tells you WHEN to do things. The reference files tell you HOW.

---

## Commands

Commands are shortcuts that let the user jump directly to any phase, action, or utility. When a user types a command, execute it immediately — don't ask for confirmation unless the command's description says to.

### Quick Reference

```
PIPELINE                          ACTION                           UTILITY
/skill:start    full pipeline     /skill:review    review output   /skill:status   where am I?
/skill:story    Phase 1 only      /skill:adjust    edit slides     /skill:help     list commands
/skill:slides   Phase 2 only      /skill:palette   change colors   /skill:qa       quality check
/skill:convert  Phase 3 only      /skill:remap     reassign types  /skill:export   save all files
```

### Pipeline Commands

| Command | Action |
|---------|--------|
| `/skill:start` | **Run the full pipeline from scratch.** Begin Phase 1 (empathy interview). Equivalent to saying "cria uma apresentação sobre X". If the user provides a topic or brief alongside the command, use that as input. |
| `/skill:story` | **Run Phase 1 only.** Start the strategic storytelling process — empathy interview, pyramid structure, MECE validation, storyline draft. Stop at Checkpoint 1 for review. Use when the user already knows they want to work on the narrative first. |
| `/skill:slides` | **Run Phase 2 only.** Ask for palette/font preferences, then build HTML slides. If no storyline exists yet, ask the user for content (action titles, data, exhibit hints) before building. If a storyline was already approved in this conversation, use it automatically. Stop at Checkpoint 2. |
| `/skill:convert` | **Run Phase 3 only.** Convert existing HTML slides to .pptx. If slides exist in the working directory, convert them. If not, ask the user where the slide files are. Ask whether to convert all slides or only changed ones. |

### Action Commands

| Command | Action |
|---------|--------|
| `/skill:review` | **Review the current output.** If in Phase 1, re-display the Storyline Package. If in Phase 2, re-display all slides with the Checkpoint 2 options. If in Phase 3, show the conversion summary. Useful when the user wants to see the output again after discussing changes. |
| `/skill:adjust` | **Adjust specific slides.** Ask which slide numbers to modify and what to change. Regenerate only those slides, keeping the rest intact. Re-present at Checkpoint 2. Works in Phase 2 or after Phase 3 (regenerate HTML then re-convert). |
| `/skill:adjust N` | **Adjust slide N directly.** Example: `/skill:adjust 5` — jump straight to editing slide 5. Ask the user what to change about that slide. |
| `/skill:palette` | **Change the color palette.** Present palette options (same interactive flow as Phase 2 Step 1). After selection, regenerate ALL slides with the new palette. This is a global change — every slide gets updated. |
| `/skill:font` | **Change typography.** Present font pairing options. After selection, regenerate all slides with the new fonts. |
| `/skill:remap` | **Reassign slide types.** Display the current slide plan (slide number → pattern mapping) and let the user override specific mappings. Example: "slide 7 should be a funnel, not a bar chart". Regenerate affected slides. |

### Utility Commands

| Command | Action |
|---------|--------|
| `/skill:status` | **Show pipeline status.** Display which phase is active, what's been completed, what's pending. Show the current palette, font, slide count, and any pending changes. |
| `/skill:help` | **List all available commands** with short descriptions. Display the Quick Reference table above. |
| `/skill:qa` | **Run quality checks** on the current slides. Verify: action titles are sentences, visual hierarchy is clear, colors are consistent, text is readable, spacing is even, Chart.js renders, no placeholders, footers have sources, file naming is correct. Report issues found. |
| `/skill:export` | **Export all deliverables.** Copy all current outputs (HTML slides + .pptx + manifest) to `/mnt/user-data/outputs/` and present them to the user. Useful when the user wants to download everything at once. |
| `/skill:plan` | **Show the slide plan** without building anything. Display the storyline-to-slide-type mapping as a table: slide number, action title, assigned pattern, exhibit type. Useful for reviewing the plan before committing to building. |

### Command Behavior Rules

1. **Commands work at any point in the conversation.** The user can type `/skill:palette` mid-pipeline and the skill should handle it gracefully — apply the change and resume where they were.
2. **Commands override the normal flow.** If the user types `/skill:convert` during Phase 1, skip to Phase 3 (but warn if no slides exist yet).
3. **Commands can be combined with natural language.** `/skill:adjust 3 — muda o gráfico para um donut chart` should work as expected.
4. **Unknown commands get a helpful response.** If the user types `/skill:something` that doesn't exist, show the help table and suggest the closest match.
5. **Commands are case-insensitive.** `/skill:Status`, `/SKILL:STATUS`, and `/skill:status` all work.

---

## How to Run the Pipeline

### Starting

When the user asks to create a presentation:

1. **Assess scope** — Full pipeline? Or does the user already have a storyline (skip Phase 1) or just need a few slides (skip to Phase 2)?
2. **Gauge deck size** — Typical consulting decks: 5-8 slides (board update), 8-15 (steering committee), 15-25 (strategy presentation).
3. **Begin Phase 1** (or skip if user already has a storyline).

---

### PHASE 1: Strategic Storyline

**Read [references/strategic-storytelling.md](references/strategic-storytelling.md) and follow its three internal phases:**

1. **Discover** — Empathy interview → Audience Empathy Map → Core Message
2. **Architect** — Pyramid structure → MECE validation → Narrative Arc
3. **Refine** — Storyline draft → Self-critique → User iteration

Phase 1 produces a **Storyline Package**: audience empathy map, core message, and a numbered storyline where each line is an action title with narrative arc annotations and exhibit hints.

See [references/phase-handoffs.md](references/phase-handoffs.md) for the exact output format.

---

### ⏸ CHECKPOINT 1: Storyline Review

**Mandatory pause.** Do NOT proceed to Phase 2 without explicit user approval.

Present the complete Storyline Package and ask using `ask_user_input`:

```
Question: "Storyline pronto. Como quer prosseguir?"
Options:
- Aprovado — seguir para a criação dos slides (Phase 2)
- Quero ajustar — vou dar feedback sobre o storyline
- Refazer — começar o storyline do zero com outra abordagem
```

If the user wants adjustments → apply feedback, re-present, ask again. Repeat until approved. **Only when approved, proceed to Phase 2.**

---

### PHASE 2: Slide Design

**Read [references/design-system.md](references/design-system.md) and [references/slide-patterns.md](references/slide-patterns.md).**

Phase 2 converts the approved Storyline Package into individual HTML slide files.

**Step 1 — Ask visual preferences.** Before building anything, ask the user about palette and typography using `ask_user_input`. Present 3-4 palette options relevant to the topic, and 2-3 font pairings. If the user says "padrão" or "tanto faz", apply Midnight Executive palette + Source Serif/Source Sans.

**Step 2 — Map storyline to slide types.** Each numbered line becomes one slide. Use the Storyline-to-Slide Pattern Mapping in [references/phase-handoffs.md](references/phase-handoffs.md) to select the appropriate HTML pattern for each slide. Briefly present the slide plan to the user ("Vou usar esses layouts — tudo bem?") before building.

**Step 3 — Build slides.** For each slide:
1. Start from the base template in design-system.md
2. Apply the user's chosen palette and fonts to CSS `:root` variables
3. Apply the pattern from slide-patterns.md matching the slide type
4. Use the action title from the storyline as-is (don't rewrite)
5. Build the exhibit that proves the title
6. Add source attribution in the footer

**Step 4 — Save and present.** Save each slide as `slide-01.html`, `slide-02.html`, etc. Copy to `/mnt/user-data/outputs/` and present to the user.

---

### ⏸ CHECKPOINT 2: Slide Review

**Mandatory pause.** Present all slides and ask using `ask_user_input`:

```
Question: "Slides prontos. Como quer prosseguir?"
Options:
- Aprovado — gerar o PPTX (Phase 3)
- Ajustar slides específicos — vou indicar quais
- Ajustar paleta/fonte — quero mudar o visual de todos
- Voltar ao storyline — preciso mudar a narrativa antes
```

If adjustments → fix, re-present, repeat. If back to storyline → return to Checkpoint 1, then regenerate affected slides.

**When the user approves, proceed to Phase 3.**

---

### PHASE 3: HTML → PPTX Conversion

**Script**: `scripts/html2pptx.js`

Phase 3 converts the approved HTML slides into a single .pptx file using a semantic parser (HTML → structured data → pptxgenjs). For complex patterns like Chart.js charts, it falls back to Puppeteer screenshots embedded as images with editable text layers (action title + footer).

**Dependencies** (install if not available):
```bash
npm install -g cheerio pptxgenjs
```

Puppeteer is available via mermaid-cli's bundled installation. The script auto-detects the Chrome executable path.

#### Conversion Scope — Ask the User

If slides were modified during an iteration (user went back to adjust storyline or specific slides), **ask what to convert** using `ask_user_input`:

```
Question: "Quais slides quer converter para PPTX?"
Options:
- Todos — gerar a apresentação completa
- Apenas os alterados — reconverter só os slides que mudaram
```

This maps to the `--only` and `--manifest` flags in the script.

#### Running the Conversion

**Full deck** (first run or user chose "todos"):
```bash
node scripts/html2pptx.js \
  --input /path/to/slides/ \
  --output /mnt/user-data/outputs/presentation.pptx \
  --title "Presentation Title" \
  --author "Author Name"
```

**Only changed slides** (using manifest from previous run):
```bash
node scripts/html2pptx.js \
  --input /path/to/slides/ \
  --output /mnt/user-data/outputs/presentation.pptx \
  --manifest /path/to/slides/presentation-manifest.json
```

**Specific slides** (user explicitly listed which ones):
```bash
node scripts/html2pptx.js \
  --input /path/to/slides/ \
  --output /mnt/user-data/outputs/presentation.pptx \
  --only 3,7,12
```

#### How the Script Works

1. **Discovers** all `slide-XX.html` files in the input directory, sorted numerically
2. **Extracts** the CSS palette and font configuration from the first slide's `:root` variables
3. **Parses** each slide's HTML into a structured SlideData object (type detection, pattern detection, content extraction)
4. **Screenshots** complex patterns (charts, frameworks, funnels, etc.) using headless Chrome via Puppeteer
5. **Converts** each SlideData into pptxgenjs calls — semantic patterns (cover, big-number, table, exec-summary, timeline) are fully editable; complex patterns use screenshot body + editable action title and footer
6. **Writes** the .pptx file and saves a manifest.json for future change detection

#### Conversion Fidelity by Pattern

| Pattern | Conversion | Editable in PPTX |
|---------|------------|-------------------|
| `cover`, `closing`, `section-divider` | Semantic | Fully editable |
| `big-number` | Semantic | Fully editable |
| `table`, `scorecard` | Semantic | Fully editable |
| `exec-summary` | Semantic | Fully editable |
| `timeline` | Semantic | Fully editable |
| `chart-*` | Screenshot body + text layers | Title, footer, annotations |
| `framework-matrix`, `funnel`, `pyramid` | Screenshot body + text layers | Title, footer |
| `explanatory-*`, `icon-cards`, `pillar-columns` | Screenshot body + text layers | Title, footer |
| `before-after`, `two-column-contrast`, `quote` | Screenshot body + text layers | Title, footer |

#### After Conversion

Present the .pptx file to the user. The manifest.json is saved alongside the PPTX for future incremental conversions.

---

## Pipeline State Tracking

The user might use commands, natural language, or a mix of both. Recognize these patterns:

| User says | Equivalent command | Action |
|-----------|-------------------|--------|
| "Cria uma apresentação sobre X" | `/skill:start` | Full pipeline → Phase 1 |
| "Já tenho o storyline, faz os slides" | `/skill:slides` | Ask for storyline → Phase 2 |
| "Muda o slide 5" | `/skill:adjust 5` | Edit specific slide, re-present |
| "Quero mudar o argumento B" | Back to Phase 1 | Revise storyline, regenerate |
| "Muda a paleta pra algo mais escuro" | `/skill:palette` | Re-present options, regenerate all |
| "Aprovado, gera o PPTX" | `/skill:convert` | Phase 3 → ask scope → run |
| "Converte só os slides alterados" | `/skill:convert` (incremental) | Phase 3 with `--manifest` |
| "Onde estamos?" | `/skill:status` | Show pipeline state |
| "Continua de onde paramos" | `/skill:status` then resume | Check last output, continue |

---

## Consulting Slide Anatomy (Non-Negotiable)

Every content slide has three zones:

| Zone | Purpose | Rule |
|------|---------|------|
| **Action title** | Slide's takeaway | Complete sentence — "Revenue declined 12% driven by churn" not "Revenue Overview" |
| **Body / Exhibit** | Visual proof | Charts, tables, frameworks, diagrams — NOT paragraphs of text |
| **Footer** | Source + page number | Small, unobtrusive, always present |

Title slides, section dividers, and closing slides are exceptions.

---

## Quality Principles

1. **The storyline IS the presentation.** Weak storyline = weak deck, regardless of visuals.
2. **Action titles are the spine.** Reading only titles should tell the complete story.
3. **Visual design serves the message.** Every choice (palette, chart, layout) amplifies the argument.
4. **Checkpoints aren't bureaucracy.** The skill handles craft; the user owns strategy.
5. **Iteration beats perfection.** Fast draft → review → refine > slow perfect attempt.
6. **Never repeat layouts.** Vary slide patterns across the deck for visual rhythm.
