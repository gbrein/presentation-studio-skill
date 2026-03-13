# 🎬 Presentation Studio

End-to-end pipeline for creating executive presentations — from raw ideas to a polished `.pptx` file — using Claude as your AI co-pilot.

A [Claude Custom Skill](https://support.anthropic.com/en/articles/custom-skills) that orchestrates three phases with interactive checkpoints, combining strategic storytelling methodology with consulting-grade visual design.

```
Raw Ideas → Strategic Storyline → HTML Slides → .pptx
              Phase 1                Phase 2      Phase 3
```

---

## ✨ What It Does

**Phase 1 — Strategic Storyline** builds a narrative backbone using Design Thinking (audience empathy), Pyramid Principle (top-down logic), and MECE (completeness validation). You get an empathy map, a governing thought, and a numbered storyline with action titles.

**Phase 2 — Slide Design** converts the storyline into individual HTML slides (1280×720px, one `.html` per slide). Includes 25 consulting-grade patterns — from cover slides and big-number callouts to Chart.js data visualizations, comparison tables, framework matrices, funnels, timelines, and more. Asks you to choose palette and typography before building.

**Phase 3 — HTML → PPTX Conversion** runs a Node.js script that parses each HTML slide semantically (keeping text editable in PowerPoint) and falls back to Puppeteer screenshots for complex patterns like charts. Includes change detection for incremental re-conversion.

**Interactive checkpoints** pause the pipeline between phases so you can review, adjust, or go back before proceeding.

---

## 📦 Installation

### As a Claude Skill

Download the `.skill` file from [Releases](../../releases) and add it to your Claude skills:

1. Open **Claude.ai** → **Settings** → **Skills**
2. Click **Add Skill** and upload `presentation-studio.skill`
3. Done — say _"create a presentation about..."_ to start

### Manual Setup

Clone this repo and point Claude to the `SKILL.md`:

```bash
git clone https://github.com/gbrein/presentation-studio.git
```

For Phase 3 conversion, install the Node.js dependencies:

```bash
npm install -g pptxgenjs cheerio
```

Puppeteer is used for Chart.js rendering. If not available globally, the script uses the bundled `chart.umd.js` and serves it locally.

---

## 🗂️ Project Structure

```
presentation-studio/
│
├── SKILL.md                              # Pipeline orchestrator (entry point)
│
├── references/                           # Documentation loaded per-phase
│   ├── strategic-storytelling.md         # Phase 1: Design Thinking + Pyramid + MECE
│   ├── phase-handoffs.md                 # Data contracts between phases
│   ├── design-system.md                  # Phase 2: Palettes, typography, Chart.js config
│   └── slide-patterns.md                 # Phase 2: 25 HTML slide patterns
│
├── scripts/                              # Executable code (Phase 3)
│   ├── html2pptx.js                      # CLI: converts HTML slides to .pptx
│   ├── assets/
│   │   └── chart.umd.js                  # Bundled Chart.js for sandboxed environments
│   └── utils/
│       ├── styles.js                     # CSS variable extraction → palette/fonts
│       ├── parser.js                     # HTML → structured SlideData objects
│       ├── converter.js                  # SlideData → pptxgenjs calls
│       └── chart-capture.js              # Puppeteer screenshot + CDN interception
│
├── examples/                             # Sample slides for reference
│   ├── slide-01-cover.html
│   ├── slide-02-big-number.html
│   ├── slide-03-chart.html
│   ├── slide-04-table.html
│   └── slide-05-closing.html
│
├── LICENSE
└── README.md
```

---

## 🚀 Usage

### Full Pipeline (recommended)

Just tell Claude what you want to present:

> _"Create a presentation about our expansion strategy for the European market"_

Or use the command: `/skill:start`

The skill will:
1. Interview you about audience, tension, and desired outcome
2. Build a Pyramid Principle structure with MECE validation
3. Draft a storyline → **pause for your review**
4. Ask your palette/font preferences
5. Build HTML slides → **pause for your review**
6. Convert to `.pptx` → deliver the file

### Phase 2 Only (you already have a storyline)

> _"I already have the storyline, build the slides"_ or `/skill:slides`

### Phase 3 Only (CLI conversion)

> `/skill:convert` or run the script directly:

```bash
# Convert all slides
node scripts/html2pptx.js --input ./slides/ --output presentation.pptx

# Only re-convert changed slides
node scripts/html2pptx.js --input ./slides/ --output presentation.pptx \
  --manifest previous-manifest.json

# Convert specific slides
node scripts/html2pptx.js --input ./slides/ --output presentation.pptx --only 3,7,12

# With metadata
node scripts/html2pptx.js --input ./slides/ --output presentation.pptx \
  --title "Board Presentation" --author "Strategy Team"
```

---

## 🎮 Commands

All commands use the `/skill:` prefix. They work at any point during the conversation and can be combined with natural language.

```
PIPELINE                            ACTION                            UTILITY
/skill:start    full pipeline       /skill:review    review output    /skill:status   where am I?
/skill:story    Phase 1 only        /skill:adjust    edit slides      /skill:help     list commands
/skill:slides   Phase 2 only        /skill:palette   change colors    /skill:qa       quality check
/skill:convert  Phase 3 only        /skill:remap     reassign types   /skill:export   save all files
                                    /skill:font      change fonts     /skill:plan     show slide plan
```

### Pipeline Commands

| Command | Description |
|---------|-------------|
| `/skill:start` | Run the full pipeline from scratch — Phase 1 through Phase 3 |
| `/skill:story` | Run Phase 1 only — build strategic storyline, stop at Checkpoint 1 |
| `/skill:slides` | Run Phase 2 only — build HTML slides from existing content |
| `/skill:convert` | Run Phase 3 only — convert HTML slides to `.pptx` |

### Action Commands

| Command | Description |
|---------|-------------|
| `/skill:review` | Re-display the current output (storyline, slides, or PPTX summary) |
| `/skill:adjust` | Modify specific slides — asks which ones and what to change |
| `/skill:adjust N` | Jump straight to editing slide N (e.g., `/skill:adjust 5`) |
| `/skill:palette` | Change color palette — presents options, regenerates all slides |
| `/skill:font` | Change typography — presents pairings, regenerates all slides |
| `/skill:remap` | Override slide type assignments (e.g., "slide 7 → funnel") |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/skill:status` | Show current pipeline state, palette, font, slide count |
| `/skill:help` | List all commands with descriptions |
| `/skill:qa` | Run quality checks on current slides and report issues |
| `/skill:export` | Save all files (HTML + PPTX + manifest) to outputs |
| `/skill:plan` | Preview the slide plan table without building anything |

---

## 🎨 Available Slide Patterns (25)

### Structural
| Pattern | Use Case |
|---------|----------|
| `cover` | Opening slide |
| `section-divider` | Transition between sections |
| `agenda` | Deck overview with numbered sections |
| `closing` | Final slide — CTA, contact |

### Data
| Pattern | Use Case |
|---------|----------|
| `big-number` | 1–4 hero KPIs with trends |
| `chart-bar` | Category comparison |
| `chart-line` | Trends over time |
| `chart-donut` | Parts of a whole |
| `chart-combo` | Dual-axis bars + line |
| `table-comparison` | Multi-criteria comparison |
| `scorecard` | RAG status tracking |

### Explanatory
| Pattern | Use Case |
|---------|----------|
| `exec-summary` | Numbered findings + callout |
| `explanatory-sidebar` | Text + metric sidebar |
| `explanatory-split` | Text + visual side by side |
| `definition` | Concept introduction |
| `quote-highlight` | Featured quote + data |
| `pillar-columns` | 3–5 parallel concepts |
| `icon-cards` | 2×2 grid of concept cards |
| `two-column-contrast` | Pros/cons, build/buy |

### Analytical
| Pattern | Use Case |
|---------|----------|
| `framework-matrix` | 2×2 strategic positioning |
| `timeline` | Phased roadmap |
| `before-after` | Current vs. proposed |
| `diagram-flow` | Process flow |
| `pyramid` | Hierarchical levels |
| `funnel` | Conversion/narrowing stages |

---

## 🎨 Color Palettes

Seven consulting-ready palettes included, each designed for specific contexts:

| Palette | Best For |
|---------|----------|
| **Midnight Executive** | Strategy, finance (default) |
| **Charcoal Precision** | Technology, operations, M&A |
| **Forest & Growth** | Sustainability, healthcare |
| **Teal Trust** | Banking, insurance, government |
| **Warm Terracotta** | Consumer, retail, emerging markets |
| **Cherry Bold** | Transformation, turnaround |
| **Ocean Depth** | Energy, infrastructure |

Custom colors are also supported — provide a hex code and the system derives the full palette.

---

## ⚙️ How Conversion Works

The `html2pptx.js` script uses a **semantic-first approach**:

1. **Parse** — Cheerio reads each HTML slide, detects type (cover, big-number, table, chart...), and extracts structured data
2. **Convert semantically** — Patterns like tables, big numbers, and covers are rebuilt with pptxgenjs → **fully editable text in PowerPoint**
3. **Screenshot fallback** — Complex patterns (Chart.js, funnels, pyramids) are rendered in headless Chrome via Puppeteer, screenshot as PNG, and embedded with editable action title + footer layers
4. **Change detection** — A manifest (MD5 hashes) tracks which slides changed between runs, enabling incremental re-conversion

| Pattern Type | Conversion | Editable in PPTX |
|-------------|------------|-------------------|
| Cover, closing, divider | Semantic | ✅ Fully |
| Big number, table, exec summary, timeline | Semantic | ✅ Fully |
| Charts (Chart.js) | Screenshot + text layers | Title & footer |
| Complex layouts (funnel, matrix, etc.) | Screenshot + text layers | Title & footer |

---

## 📋 Methodology

### Phase 1 integrates three frameworks:

- **Design Thinking** (IDEO) — Empathy-first audience understanding. Builds an Empathy Map before writing a word.
- **Pyramid Principle** (Barbara Minto) — Top-down communication. Lead with the answer, support with grouped arguments.
- **MECE** (McKinsey) — Mutually Exclusive, Collectively Exhaustive. Every argument is validated for logical completeness.

### Phase 2 follows consulting design principles:

- **Action titles** — Every slide title is a complete sentence stating the takeaway (not a topic label)
- **Exhibit-driven** — Visual proof (charts, tables, frameworks) dominates; bullets are a last resort
- **Three-zone anatomy** — Header (action title) → Body (exhibit) → Footer (source + page number)
- **Layout variation** — Never repeat the same pattern on consecutive slides

---

## 🤝 Contributing

Contributions are welcome. Some areas that could use help:

- **New slide patterns** — Add to `references/slide-patterns.md` with the HTML template
- **Semantic converters** — Add pattern-specific converters in `scripts/utils/converter.js` to reduce screenshot fallbacks
- **New palettes** — Add to `references/design-system.md`
- **Localization** — The skill works in any language but examples are in Portuguese/English

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with [Claude](https://claude.ai) by Anthropic. Uses [pptxgenjs](https://github.com/gitbrent/PptxGenJS) for PowerPoint generation, [Chart.js](https://www.chartjs.org/) for data visualization, [Cheerio](https://cheerio.js.org/) for HTML parsing, and [Puppeteer](https://pptr.dev/) for headless rendering.

Storytelling methodology inspired by IDEO's Design Thinking, Barbara Minto's Pyramid Principle, and McKinsey's MECE framework.
