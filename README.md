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
3. Done — say _"cria uma apresentação sobre..."_ to start

### Manual Setup

Clone this repo and point Claude to the `SKILL.md`:

```bash
git clone https://github.com/YOUR_USERNAME/presentation-studio.git
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

> _"Cria uma apresentação sobre a estratégia de expansão para o mercado europeu"_

The skill will:
1. Interview you about audience, tension, and desired outcome
2. Build a Pyramid Principle structure with MECE validation
3. Draft a storyline → **pause for your review**
4. Ask your palette/font preferences
5. Build HTML slides → **pause for your review**
6. Convert to `.pptx` → deliver the file

### Phase 2 Only (you already have a storyline)

> _"Já tenho o storyline, faz os slides"_

### Phase 3 Only (CLI conversion)

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
