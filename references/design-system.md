# Design System Reference

Base template, CSS variables, color palettes, and typography for consulting-grade HTML slides.

---

## Table of Contents

1. [Base HTML Template](#base-html-template)
2. [Color Palettes](#color-palettes)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Chart.js Defaults](#chartjs-defaults)
6. [Utility Classes](#utility-classes)

---

## Base HTML Template

Every slide starts from this template. Copy it, then add the slide-specific content inside `<div class="slide-body">`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1280">
<title>Slide</title>
<style>
  /* ===== RESET ===== */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  /* ===== PALETTE (replace with chosen palette) ===== */
  :root {
    --color-dark:        #1A2332;
    --color-dark-muted:  #3D4F63;
    --color-light:       #FFFFFF;
    --color-light-muted: #F4F5F7;
    --color-accent:      #2B6CB0;
    --color-accent-light:#EBF2FA;
    --color-accent-dark: #1E4D7B;
    --color-positive:    #2F855A;
    --color-negative:    #C53030;
    --color-muted:       #8896A4;
    --color-border:      #DCE1E8;
    --color-alt-row:     #F8F9FB;

    /* Typography */
    --font-heading: 'Georgia', 'Times New Roman', serif;
    --font-body:    'Calibri', 'Helvetica Neue', Arial, sans-serif;

    /* Spacing base unit */
    --space-unit: 24px;
  }

  /* ===== SLIDE FRAME ===== */
  html, body {
    width: 1280px;
    height: 720px;
    overflow: hidden;
    font-family: var(--font-body);
    color: var(--color-dark);
    background: var(--color-light);
    -webkit-font-smoothing: antialiased;
  }

  .slide {
    width: 1280px;
    height: 720px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* ===== THREE-ZONE LAYOUT ===== */
  .slide-header {
    padding: var(--space-unit) 48px 12px 48px;
    min-height: 80px;
  }

  .slide-body {
    flex: 1;
    padding: 0 48px;
    display: flex;
    overflow: hidden;
  }

  .slide-footer {
    padding: 8px 48px 16px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
  }

  /* ===== ACTION TITLE ===== */
  .action-title {
    font-family: var(--font-heading);
    font-size: 22px;
    font-weight: 700;
    color: var(--color-dark);
    line-height: 1.3;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-accent);
  }

  /* ===== FOOTER ===== */
  .source {
    font-size: 10px;
    color: var(--color-muted);
    font-style: italic;
  }

  .page-number {
    font-size: 10px;
    color: var(--color-muted);
    font-weight: 600;
  }

  /* ===== COMMON ELEMENTS ===== */
  .callout-box {
    background: var(--color-accent-light);
    border-left: 4px solid var(--color-accent);
    padding: 16px 20px;
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    line-height: 1.5;
  }

  .metric-card {
    text-align: center;
    padding: var(--space-unit);
  }
  .metric-card .value {
    font-family: var(--font-heading);
    font-size: 48px;
    font-weight: 700;
    color: var(--color-accent);
    line-height: 1.1;
  }
  .metric-card .label {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-dark);
    margin-top: 8px;
  }
  .metric-card .sublabel {
    font-size: 12px;
    color: var(--color-muted);
    margin-top: 4px;
  }

  /* ===== TABLES ===== */
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  table.data-table th {
    background: var(--color-dark);
    color: var(--color-light);
    font-weight: 600;
    padding: 10px 14px;
    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  table.data-table td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--color-border);
  }
  table.data-table tr:nth-child(even) td {
    background: var(--color-alt-row);
  }
  table.data-table .highlight {
    font-weight: 700;
    color: var(--color-accent);
  }
  table.data-table .positive { color: var(--color-positive); font-weight: 600; }
  table.data-table .negative { color: var(--color-negative); font-weight: 600; }

  /* ===== CHART CONTAINER ===== */
  .chart-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 12px 0;
  }
  .chart-container canvas {
    max-width: 100%;
    max-height: 100%;
  }

  /* ===== GRID LAYOUTS ===== */
  .grid-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-unit);
    width: 100%;
  }
  .grid-3col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-unit);
    width: 100%;
  }
  .grid-4col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: var(--space-unit);
    width: 100%;
  }
  .grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    width: 100%;
    height: 100%;
  }
</style>
</head>
<body>
  <div class="slide">
    <div class="slide-header">
      <h1 class="action-title">Action title goes here — a complete sentence</h1>
    </div>
    <div class="slide-body">
      <!-- Exhibit goes here -->
    </div>
    <div class="slide-footer">
      <span class="source">Source: Company data, 2024</span>
      <span class="page-number">01</span>
    </div>
  </div>
</body>
</html>
```

### Template Variants

**Cover / Title slide**: Remove `slide-header` and `slide-footer`. Use `slide-body` as full-height centered content with dark background.

**Section Divider**: Remove `slide-footer`. Dark background, large centered section title.

**Closing slide**: Similar to cover, with a call-to-action or contact info.

---

## Color Palettes

Choose ONE palette per deck. Replace the CSS `:root` variables. Each palette is designed for consulting contexts — professional, high-contrast, with clear data hierarchy.

### Midnight Executive (Default)
Best for: General-purpose, finance, strategy
```css
--color-dark:        #1A2332;
--color-dark-muted:  #3D4F63;
--color-light:       #FFFFFF;
--color-light-muted: #F4F5F7;
--color-accent:      #2B6CB0;
--color-accent-light:#EBF2FA;
--color-accent-dark: #1E4D7B;
--color-muted:       #8896A4;
--color-border:      #DCE1E8;
--color-alt-row:     #F8F9FB;
```

### Charcoal Precision
Best for: Technology, operations, M&A
```css
--color-dark:        #212121;
--color-dark-muted:  #4A4A4A;
--color-light:       #FFFFFF;
--color-light-muted: #F5F5F5;
--color-accent:      #37474F;
--color-accent-light:#ECEFF1;
--color-accent-dark: #263238;
--color-muted:       #9E9E9E;
--color-border:      #E0E0E0;
--color-alt-row:     #FAFAFA;
```

### Forest & Growth
Best for: Sustainability, healthcare, agriculture, positive-growth narratives
```css
--color-dark:        #1B3A2D;
--color-dark-muted:  #3D6B55;
--color-light:       #FFFFFF;
--color-light-muted: #F2F7F4;
--color-accent:      #2E7D52;
--color-accent-light:#E8F5EC;
--color-accent-dark: #1B5E3B;
--color-muted:       #7FA893;
--color-border:      #D4E5DB;
--color-alt-row:     #F7FAF8;
```

### Teal Trust
Best for: Banking, insurance, compliance, government
```css
--color-dark:        #0D2B33;
--color-dark-muted:  #2A5561;
--color-light:       #FFFFFF;
--color-light-muted: #F0F7F9;
--color-accent:      #028090;
--color-accent-light:#E0F4F7;
--color-accent-dark: #016670;
--color-muted:       #7AABB5;
--color-border:      #C8DFE4;
--color-alt-row:     #F5FAFB;
```

### Warm Terracotta
Best for: Consumer, retail, culture, emerging markets
```css
--color-dark:        #2C1810;
--color-dark-muted:  #5A3D31;
--color-light:       #FFFFFF;
--color-light-muted: #FBF6F3;
--color-accent:      #B85042;
--color-accent-light:#F9EDEB;
--color-accent-dark: #8B3A2F;
--color-muted:       #A69389;
--color-border:      #E5D9D4;
--color-alt-row:     #FDF9F7;
```

### Cherry Bold
Best for: Transformation, urgency, disruption, turnaround stories
```css
--color-dark:        #1A0A0B;
--color-dark-muted:  #4D2628;
--color-light:       #FFFFFF;
--color-light-muted: #FCF6F5;
--color-accent:      #990011;
--color-accent-light:#FDE8EB;
--color-accent-dark: #6B000C;
--color-muted:       #A68A8C;
--color-border:      #E8D5D7;
--color-alt-row:     #FDF8F8;
```

### Ocean Depth
Best for: Maritime, energy, infrastructure, institutional
```css
--color-dark:        #0A1929;
--color-dark-muted:  #1E3A5F;
--color-light:       #FFFFFF;
--color-light-muted: #EFF4F9;
--color-accent:      #065A82;
--color-accent-light:#E3EEF5;
--color-accent-dark: #043D58;
--color-muted:       #7B9BB5;
--color-border:      #C5D6E3;
--color-alt-row:     #F5F8FB;
```

### Data Visualization Colors

In addition to the palette, use these for multi-series charts. Pick 2-4 from the set that harmonize with your chosen palette:

```css
/* Series colors — use with Chart.js datasets */
--chart-series-1: var(--color-accent);
--chart-series-2: var(--color-accent-dark);
--chart-series-3: #E67E22;  /* warm contrast */
--chart-series-4: var(--color-muted);
```

For positive/negative encoding:
```css
--color-positive: #2F855A;  /* consistent green across all palettes */
--color-negative: #C53030;  /* consistent red across all palettes */
```

---

## Typography

### Font Loading

Use Google Fonts for web-safe alternatives to consulting staples. Add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update CSS variables:
```css
--font-heading: 'Source Serif 4', Georgia, serif;
--font-body: 'Source Sans 3', Calibri, sans-serif;
```

### Recommended Pairings

| Context | Heading | Body | Vibe |
|---------|---------|------|------|
| Classic consulting | Source Serif 4 | Source Sans 3 | Authoritative, trustworthy |
| Modern corporate | DM Sans | DM Sans (lighter weight) | Clean, contemporary |
| Premium / luxury | Playfair Display | Lato | Elegant, premium |
| Technical / data-heavy | IBM Plex Sans | IBM Plex Sans | Precise, engineered |
| Bold / transformation | Sora | Inter | Forward-looking |

### Size Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Cover title | 40-48px | 700 | Title slide only |
| Section divider title | 32-36px | 700 | Section break slides |
| Action title | 22-26px | 700 | Every content slide |
| Subtitle / section | 16-18px | 600 | Within-exhibit headers |
| Body text | 14-16px | 400 | Labels, descriptions |
| Small / caption | 11-12px | 400 | Annotations, chart labels |
| Source / footer | 10px | 400 italic | Footer only |

---

## Spacing System

Use multiples of the base unit (24px) for consistency:

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 6px | Tight gaps (label to value) |
| `--space-sm` | 12px | Between related elements |
| `--space-md` | 24px | Standard gap (base unit) |
| `--space-lg` | 36px | Between sections |
| `--space-xl` | 48px | Slide margins (left/right) |

**Slide margins**: 48px left/right, 24px top (below header), 16px bottom (above footer).

**Between elements within exhibit**: 24px default. Tighter (12px) for closely related items like a chart title and its chart.

---

## Chart.js Defaults

Standard configuration object to apply to all Chart.js charts. This ensures consistent visual treatment.

```javascript
// Apply before creating any chart
Chart.defaults.font.family = "'Source Sans 3', Calibri, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#3D4F63';
Chart.defaults.plugins.legend.display = false; // hide by default, enable per-chart

const CONSULTING_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // enable explicitly when multi-series
      position: 'top',
      align: 'start',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyleWidth: 10,
        font: { size: 12, weight: '500' }
      }
    },
    tooltip: {
      backgroundColor: '#1A2332',
      titleFont: { size: 13, weight: '600' },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 4,
      displayColors: false
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, color: '#8896A4' },
      border: { color: '#DCE1E8' }
    },
    y: {
      grid: { color: '#E8E8E8', lineWidth: 0.8 },
      ticks: { font: { size: 11 }, color: '#8896A4', padding: 8 },
      border: { display: false }
    }
  }
};
```

### Chart Type-Specific Adjustments

**Bar chart** — Add data labels on top:
```javascript
plugins: [{
  id: 'dataLabels',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.fillStyle = '#3D4F63';
        ctx.font = '600 12px "Source Sans 3", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value, bar.x, bar.y - 8);
      });
    });
  }
}]
```

**Line chart** — Smooth curves, area fill:
```javascript
{
  tension: 0.3,
  fill: true,
  backgroundColor: 'rgba(43, 108, 176, 0.08)',
  borderWidth: 2.5,
  pointRadius: 4,
  pointBackgroundColor: '#FFFFFF',
  pointBorderWidth: 2
}
```

**Donut chart** — Clean center label:
```javascript
{
  cutout: '65%',
  plugins: [{
    id: 'centerLabel',
    beforeDraw(chart) {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.font = '700 36px "Source Serif 4", serif';
      ctx.fillStyle = '#1A2332';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$4.2M', width / 2, height / 2 - 8);
      ctx.font = '400 13px "Source Sans 3", sans-serif';
      ctx.fillStyle = '#8896A4';
      ctx.fillText('Total Revenue', width / 2, height / 2 + 18);
      ctx.restore();
    }
  }]
}
```

---

## Utility Classes

Additional CSS classes to include in the base template when needed:

```css
/* Layout helpers */
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-col { display: flex; flex-direction: column; }
.gap-sm { gap: 12px; }
.gap-md { gap: 24px; }
.gap-lg { gap: 36px; }

/* Text helpers */
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-muted); }
.text-positive { color: var(--color-positive); }
.text-negative { color: var(--color-negative); }
.text-center { text-align: center; }
.font-heading { font-family: var(--font-heading); }
.bold { font-weight: 700; }
.semibold { font-weight: 600; }

/* Visual elements */
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-border);
  margin: 16px 0;
}
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-accent { background: var(--color-accent); color: var(--color-light); }
.badge-positive { background: var(--color-positive); color: var(--color-light); }
.badge-negative { background: var(--color-negative); color: var(--color-light); }
.badge-muted { background: var(--color-light-muted); color: var(--color-dark-muted); }
```
