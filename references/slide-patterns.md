# Slide Patterns Reference

HTML patterns for each consulting slide type. Each pattern shows the `<body>` content — combine with the base template from `design-system.md`.

---

## Table of Contents

1. [Content-to-Slide Matching Rules](#content-to-slide-matching-rules)
2. [Cover / Title Slide](#cover--title-slide)
3. [Section Divider](#section-divider)
4. [Agenda Slide](#agenda-slide)
5. [Executive Summary](#executive-summary)
6. [Big Number Callout](#big-number-callout)
7. [Bar Chart](#bar-chart)
8. [Line Chart](#line-chart)
9. [Donut Chart](#donut-chart)
10. [Comparison Table](#comparison-table)
11. [Framework Matrix (2x2)](#framework-matrix-2x2)
12. [Timeline / Roadmap](#timeline--roadmap)
13. [Before / After Split](#before--after-split)
14. [Process Flow / Diagram](#process-flow--diagram)
15. [Icon Cards Grid](#icon-cards-grid)
16. [Explanatory with Sidebar](#explanatory-with-sidebar)
17. [Explanatory Split (Text + Visual)](#explanatory-split-text--visual)
18. [Definition Slide](#definition-slide)
19. [Quote Highlight](#quote-highlight)
20. [Pillar Columns](#pillar-columns)
21. [Two-Column Contrast](#two-column-contrast)
22. [Scorecard / Status Tracker](#scorecard--status-tracker)
23. [Pyramid Hierarchy](#pyramid-hierarchy)
24. [Funnel](#funnel)
25. [Closing Slide](#closing-slide)

---

## Content-to-Slide Matching Rules

When the user provides raw content, use these signals to automatically select the best slide type. The goal is to never produce a generic bullet-point slide when a richer pattern exists.

**Decision process:**

1. **Scan for data signals** — numbers, percentages, time periods, comparisons → route to a Data pattern
2. **Scan for structure signals** — numbered lists, steps, phases, before/after → route to an Analytical pattern
3. **Scan for narrative signals** — long explanations, definitions, quotes, conceptual content → route to an Explanatory pattern
4. **Scan for navigation signals** — topic transitions, agendas, closings → route to a Structural pattern

**Escalation rule:** If content is too dense for one slide, split it. A section divider + 2-3 content slides is always better than one overcrowded slide. When splitting, the divider introduces the section and each content slide focuses on one specific message.

**Layout variation rule:** Never place two consecutive slides with identical layouts. If you just used a bar chart, the next slide should be a different pattern (table, big number, split exhibit, etc.). Vary between full-width exhibits, two-column layouts, and grid layouts to maintain visual rhythm across the deck.

---

## Cover / Title Slide

Dark background. No header/footer zones. Centered or left-aligned. Sets the tone for the entire deck.

```html
<div class="slide" style="background: var(--color-dark);">
  <div class="slide-body" style="flex-direction: column; justify-content: center; padding: 0 80px;">

    <!-- Optional: thin accent line as a visual anchor -->
    <div style="width: 60px; height: 3px; background: var(--color-accent); margin-bottom: 32px;"></div>

    <h1 style="font-family: var(--font-heading); font-size: 44px; font-weight: 700;
               color: var(--color-light); line-height: 1.2; max-width: 900px;">
      Presentation Title Goes Here
    </h1>

    <p style="font-size: 18px; color: var(--color-muted); margin-top: 16px; max-width: 700px;
              line-height: 1.5;">
      Subtitle or context line — client name, project, date
    </p>

    <div style="margin-top: 48px; font-size: 13px; color: var(--color-muted);">
      <span>Presenter Name</span>
      <span style="margin: 0 12px; opacity: 0.4;">|</span>
      <span>Organization</span>
      <span style="margin: 0 12px; opacity: 0.4;">|</span>
      <span>March 2026</span>
    </div>

  </div>
</div>
```

**Variations**:
- **Right-aligned image**: Use `grid-2col` with title content on left, a large visual/icon on right
- **Full-bleed accent**: Add a vertical accent bar on the left edge (4-6px wide, full height)

---

## Section Divider

Marks transitions between deck sections. Dark background, minimal content, strong visual hierarchy.

```html
<div class="slide" style="background: var(--color-dark);">
  <div class="slide-body" style="flex-direction: column; justify-content: center; padding: 0 80px;">

    <span style="font-family: var(--font-heading); font-size: 56px; font-weight: 700;
                 color: var(--color-accent); line-height: 1; margin-bottom: 16px;">
      01
    </span>

    <h2 style="font-family: var(--font-heading); font-size: 32px; font-weight: 700;
               color: var(--color-light); line-height: 1.3; max-width: 800px;">
      Section Title
    </h2>

    <p style="font-size: 15px; color: var(--color-muted); margin-top: 12px; max-width: 600px;">
      Optional one-line description of this section
    </p>

  </div>
</div>
```

---

## Agenda Slide

Deck overview showing numbered sections. Helps the audience understand the narrative arc. Optional: highlight the current section when reused as a navigation aid between sections.

```html
<div class="slide-header">
  <h1 class="action-title">Agenda</h1>
</div>

<div class="slide-body" style="flex-direction: column; justify-content: center; gap: 0; padding: 0 80px;">

  <div style="display: flex; align-items: flex-start; gap: 24px; padding: 18px 0;
              border-bottom: 1px solid var(--color-border);">
    <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                 color: var(--color-accent); min-width: 40px;">01</span>
    <div>
      <div style="font-size: 17px; font-weight: 600; color: var(--color-dark);">Context & Diagnostic</div>
      <div style="font-size: 13px; color: var(--color-muted); margin-top: 2px;">
        Current state assessment and key findings
      </div>
    </div>
  </div>

  <div style="display: flex; align-items: flex-start; gap: 24px; padding: 18px 0;
              border-bottom: 1px solid var(--color-border);">
    <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                 color: var(--color-accent); min-width: 40px;">02</span>
    <div>
      <div style="font-size: 17px; font-weight: 600; color: var(--color-dark);">Strategic Options</div>
      <div style="font-size: 13px; color: var(--color-muted); margin-top: 2px;">
        Three scenarios evaluated against success criteria
      </div>
    </div>
  </div>

  <div style="display: flex; align-items: flex-start; gap: 24px; padding: 18px 0;
              border-bottom: 1px solid var(--color-border);">
    <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                 color: var(--color-accent); min-width: 40px;">03</span>
    <div>
      <div style="font-size: 17px; font-weight: 600; color: var(--color-dark);">Recommendation & Roadmap</div>
      <div style="font-size: 13px; color: var(--color-muted); margin-top: 2px;">
        Proposed path forward with implementation plan
      </div>
    </div>
  </div>

  <div style="display: flex; align-items: flex-start; gap: 24px; padding: 18px 0;">
    <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                 color: var(--color-accent); min-width: 40px;">04</span>
    <div>
      <div style="font-size: 17px; font-weight: 600; color: var(--color-dark);">Next Steps & Ask</div>
      <div style="font-size: 13px; color: var(--color-muted); margin-top: 2px;">
        Decisions needed and immediate actions
      </div>
    </div>
  </div>

</div>

<div class="slide-footer">
  <span class="source"></span>
  <span class="page-number">02</span>
</div>
```

**Variation — Active section highlight:** When reusing the agenda as a section transition, add `background: var(--color-accent-light); border-radius: 6px; padding: 18px 16px;` to the active section's row and dim the others with `opacity: 0.4`.

---

## Executive Summary

4-5 key findings as numbered items, with a highlighted bottom-line callout box. This is the most important content slide in a consulting deck.

```html
<!-- Standard three-zone layout -->
<div class="slide-header">
  <h1 class="action-title">Five key findings point to a need for immediate restructuring of the sales organization</h1>
</div>

<div class="slide-body" style="flex-direction: column; gap: 20px; padding-top: 16px;">

  <div style="flex: 1;">
    <ol style="list-style: none; counter-reset: finding; padding: 0;">

      <li style="display: flex; gap: 16px; margin-bottom: 14px; align-items: baseline;">
        <span style="font-family: var(--font-heading); font-size: 20px; font-weight: 700;
                     color: var(--color-accent); min-width: 24px;">1</span>
        <span style="font-size: 15px; line-height: 1.5;">
          Finding statement with supporting data point — <strong>quantified impact</strong>
        </span>
      </li>

      <!-- Repeat for findings 2-5 -->

    </ol>
  </div>

  <!-- Bottom-line callout -->
  <div class="callout-box" style="margin-top: auto;">
    <strong>Bottom line:</strong> One-sentence synthesis that connects all findings to the recommendation.
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Analysis of company data, Q1-Q4 2025</span>
  <span class="page-number">02</span>
</div>
```

---

## Big Number Callout

1-4 hero metrics. Works for KPI dashboards, performance snapshots, impact summaries.

```html
<div class="slide-header">
  <h1 class="action-title">Q4 performance exceeded targets across all three core metrics</h1>
</div>

<div class="slide-body" style="align-items: center; justify-content: center;">
  <div class="grid-3col" style="width: 100%; text-align: center;">

    <div class="metric-card">
      <div class="value">$4.2M</div>
      <div class="label">Revenue</div>
      <div class="sublabel">+18% vs. Q3</div>
    </div>

    <div class="metric-card" style="border-left: 1px solid var(--color-border);
                                     border-right: 1px solid var(--color-border);">
      <div class="value">92%</div>
      <div class="label">Customer Retention</div>
      <div class="sublabel">Target: 85%</div>
    </div>

    <div class="metric-card">
      <div class="value">3.2x</div>
      <div class="label">ROI</div>
      <div class="sublabel">vs. 2.1x industry avg</div>
    </div>

  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Internal performance dashboard, Dec 2025</span>
  <span class="page-number">03</span>
</div>
```

**Variations**:
- **2 metrics**: Use `grid-2col`
- **4 metrics**: Use `grid-4col` with smaller font size (36-40px for values)
- **With trend indicators**: Add `▲ +12%` in green or `▼ -5%` in red below the sublabel

---

## Bar Chart

Vertical bar chart using Chart.js. Best for comparing categories or showing change over time with discrete periods.

```html
<div class="slide-header">
  <h1 class="action-title">Revenue grew consistently across all quarters, accelerating in Q4</h1>
</div>

<div class="slide-body">
  <div class="chart-container">
    <canvas id="barChart"></canvas>
  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Finance team, FY2025 actuals</span>
  <span class="page-number">04</span>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script>
  const ctx = document.getElementById('barChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        data: [2800, 3200, 3600, 4200],
        backgroundColor: [
          'rgba(43, 108, 176, 0.75)',
          'rgba(43, 108, 176, 0.75)',
          'rgba(43, 108, 176, 0.75)',
          'rgba(43, 108, 176, 1)'  /* highlight last bar */
        ],
        borderRadius: 4,
        barPercentage: 0.6
      }]
    },
    options: {
      ...CONSULTING_CHART_OPTIONS,  /* from design-system.md */
      scales: {
        ...CONSULTING_CHART_OPTIONS.scales,
        y: {
          ...CONSULTING_CHART_OPTIONS.scales.y,
          ticks: {
            ...CONSULTING_CHART_OPTIONS.scales.y.ticks,
            callback: (v) => '$' + (v / 1000).toFixed(1) + 'K'
          }
        }
      }
    },
    /* Data labels plugin from design-system.md */
  });
</script>
```

**Variations**:
- **Horizontal bars**: `type: 'bar'` with `indexAxis: 'y'` — better for long category names
- **Stacked bars**: Add `stacked: true` to both x and y scales
- **Highlighted single bar**: Make one bar a different color (accent) to draw attention

---

## Line Chart

For trends over time. Use when continuity between data points matters.

```html
<div class="slide-header">
  <h1 class="action-title">Customer acquisition cost declined steadily as marketing efficiency improved</h1>
</div>

<div class="slide-body">
  <div class="chart-container">
    <canvas id="lineChart"></canvas>
  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Marketing analytics platform, Jan-Dec 2025</span>
  <span class="page-number">05</span>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script>
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'CAC ($)',
        data: [142, 138, 129, 125, 118, 112, 105, 98, 94, 88, 82, 78],
        borderColor: 'var(--color-accent, #2B6CB0)',
        backgroundColor: 'rgba(43, 108, 176, 0.06)',
        tension: 0.3,
        fill: true,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#2B6CB0',
        pointBorderWidth: 2
      }]
    },
    options: {
      ...CONSULTING_CHART_OPTIONS,
      plugins: {
        ...CONSULTING_CHART_OPTIONS.plugins,
        legend: { display: false }
      }
    }
  });
</script>
```

**Multi-series**: Add more datasets, enable legend (`display: true`), limit to 3-4 lines max.

---

## Donut Chart

For composition / parts-of-a-whole. Include a center label with the key figure.

```html
<div class="slide-header">
  <h1 class="action-title">Enterprise segment accounts for 62% of total revenue, driving margin expansion</h1>
</div>

<div class="slide-body" style="align-items: center;">
  <div class="grid-2col" style="align-items: center;">

    <!-- Chart -->
    <div class="chart-container" style="max-width: 360px; margin: 0 auto;">
      <canvas id="donutChart"></canvas>
    </div>

    <!-- Legend as designed list (not Chart.js legend) -->
    <div style="padding-left: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div style="width: 14px; height: 14px; border-radius: 3px; background: #2B6CB0;"></div>
        <div>
          <div style="font-size: 15px; font-weight: 600;">Enterprise — 62%</div>
          <div style="font-size: 12px; color: var(--color-muted);">$2.6M revenue</div>
        </div>
      </div>
      <!-- Repeat for other segments -->
    </div>

  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Revenue breakdown, FY2025</span>
  <span class="page-number">06</span>
</div>
```

---

## Comparison Table

For structured data comparison. Styled with alternating rows, highlighted cells.

```html
<div class="slide-header">
  <h1 class="action-title">Option B outperforms on cost and timeline, with comparable quality metrics</h1>
</div>

<div class="slide-body" style="align-items: flex-start; padding-top: 16px;">
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Criteria</th>
        <th style="width: 25%;">Option A</th>
        <th style="width: 25%; background: var(--color-accent);">Option B (Recommended)</th>
        <th style="width: 25%;">Option C</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight: 600;">Implementation Cost</td>
        <td>$2.4M</td>
        <td class="highlight">$1.8M</td>
        <td>$3.1M</td>
      </tr>
      <tr>
        <td style="font-weight: 600;">Timeline</td>
        <td>18 months</td>
        <td class="highlight">12 months</td>
        <td>24 months</td>
      </tr>
      <tr>
        <td style="font-weight: 600;">Expected ROI</td>
        <td class="positive">2.1x</td>
        <td class="positive" style="font-weight: 700;">3.2x</td>
        <td>1.8x</td>
      </tr>
      <tr>
        <td style="font-weight: 600;">Risk Level</td>
        <td>Medium</td>
        <td class="positive">Low</td>
        <td class="negative">High</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="slide-footer">
  <span class="source">Source: Vendor proposals and internal cost modeling</span>
  <span class="page-number">07</span>
</div>
```

---

## Framework Matrix (2x2)

Classic consulting 2x2. Use for strategic positioning, prioritization, portfolio analysis.

```html
<div class="slide-header">
  <h1 class="action-title">Portfolio analysis reveals three high-priority initiatives and two candidates for divestment</h1>
</div>

<div class="slide-body" style="flex-direction: column; padding-top: 8px;">

  <!-- Axis labels -->
  <div style="position: relative; flex: 1; width: 100%;">

    <!-- Y-axis label -->
    <div style="position: absolute; left: -8px; top: 50%; transform: rotate(-90deg) translateX(-50%);
                transform-origin: left center; font-size: 12px; color: var(--color-muted);
                font-style: italic; white-space: nowrap;">
      Market Attractiveness →
    </div>

    <!-- Grid -->
    <div class="grid-2x2" style="margin-left: 32px; height: 100%;">

      <div style="background: var(--color-accent-light); border-radius: 6px; padding: 20px;">
        <div style="font-size: 14px; font-weight: 700; color: var(--color-accent); margin-bottom: 10px;">
          ★ INVEST & GROW
        </div>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 16px; color: var(--color-dark);">
          <li>Initiative A — Digital platform</li>
          <li>Initiative B — API marketplace</li>
        </ul>
      </div>

      <div style="background: var(--color-light-muted); border-radius: 6px; padding: 20px;">
        <div style="font-size: 14px; font-weight: 700; color: var(--color-dark-muted); margin-bottom: 10px;">
          SELECTIVE INVESTMENT
        </div>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 16px; color: var(--color-dark);">
          <li>Initiative C — New market entry</li>
        </ul>
      </div>

      <div style="background: var(--color-light-muted); border-radius: 6px; padding: 20px;">
        <div style="font-size: 14px; font-weight: 700; color: var(--color-dark-muted); margin-bottom: 10px;">
          MAINTAIN / HARVEST
        </div>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 16px; color: var(--color-dark);">
          <li>Initiative D — Legacy product</li>
        </ul>
      </div>

      <div style="background: #FFF5F5; border-radius: 6px; padding: 20px;">
        <div style="font-size: 14px; font-weight: 700; color: var(--color-negative); margin-bottom: 10px;">
          DIVEST / EXIT
        </div>
        <ul style="font-size: 13px; line-height: 1.6; padding-left: 16px; color: var(--color-dark);">
          <li>Initiative E — Underperforming unit</li>
          <li>Initiative F — Non-core asset</li>
        </ul>
      </div>

    </div>

    <!-- X-axis label -->
    <div style="text-align: center; font-size: 12px; color: var(--color-muted);
                font-style: italic; margin-top: 8px; margin-left: 32px;">
      Competitive Strength →
    </div>

  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Portfolio assessment, Feb 2026</span>
  <span class="page-number">08</span>
</div>
```

---

## Timeline / Roadmap

Horizontal phases with milestones. Best for implementation plans, project roadmaps.

```html
<div class="slide-header">
  <h1 class="action-title">Implementation follows three phases over 18 months, with quick wins in Phase 1</h1>
</div>

<div class="slide-body" style="flex-direction: column; gap: 0; padding-top: 16px;">

  <!-- Phase bars -->
  <div style="display: flex; gap: 8px; margin-bottom: 8px;">

    <div style="flex: 2; background: var(--color-accent); border-radius: 6px; padding: 14px 20px;">
      <div style="font-size: 14px; font-weight: 700; color: var(--color-light);">Phase 1: Foundation</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 2px;">Months 1-6</div>
    </div>

    <div style="flex: 2; background: var(--color-accent-dark); border-radius: 6px; padding: 14px 20px;">
      <div style="font-size: 14px; font-weight: 700; color: var(--color-light);">Phase 2: Scale</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 2px;">Months 7-12</div>
    </div>

    <div style="flex: 1; background: var(--color-dark-muted); border-radius: 6px; padding: 14px 20px;">
      <div style="font-size: 14px; font-weight: 700; color: var(--color-light);">Phase 3: Optimize</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 2px;">Months 13-18</div>
    </div>

  </div>

  <!-- Milestones below each phase -->
  <div style="display: flex; gap: 8px; flex: 1;">

    <div style="flex: 2; padding: 12px 8px 0 8px;">
      <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark);">
        <li>Complete diagnostic assessment</li>
        <li>Deploy quick-win initiatives</li>
        <li>Establish governance structure</li>
      </ul>
    </div>

    <div style="flex: 2; padding: 12px 8px 0 8px; border-left: 1px solid var(--color-border);">
      <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark);">
        <li>Roll out to all business units</li>
        <li>Integrate technology platform</li>
        <li>Train 200+ team members</li>
      </ul>
    </div>

    <div style="flex: 1; padding: 12px 8px 0 8px; border-left: 1px solid var(--color-border);">
      <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark);">
        <li>Performance tuning</li>
        <li>Continuous improvement</li>
      </ul>
    </div>

  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Project management office</span>
  <span class="page-number">09</span>
</div>
```

---

## Before / After Split

Side-by-side comparison with visual contrast between current and proposed state.

```html
<div class="slide-header">
  <h1 class="action-title">Proposed operating model eliminates three redundant layers and reduces cycle time by 40%</h1>
</div>

<div class="slide-body" style="gap: 0;">

  <!-- Before column -->
  <div style="flex: 1; padding-right: 24px;">
    <div style="background: var(--color-muted); color: var(--color-light); padding: 10px 20px;
                border-radius: 6px 6px 0 0; font-weight: 700; font-size: 14px; text-align: center;">
      Current State
    </div>
    <div style="border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 6px 6px;
                padding: 20px; flex: 1;">
      <ul style="font-size: 14px; line-height: 1.8; padding-left: 16px;">
        <li>5 approval layers</li>
        <li>Average 12-day cycle time</li>
        <li>Manual handoffs between teams</li>
        <li>No real-time visibility</li>
      </ul>
    </div>
  </div>

  <!-- Arrow divider -->
  <div style="display: flex; align-items: center; padding: 0 16px;">
    <div style="font-size: 32px; color: var(--color-accent);">→</div>
  </div>

  <!-- After column -->
  <div style="flex: 1; padding-left: 24px;">
    <div style="background: var(--color-accent); color: var(--color-light); padding: 10px 20px;
                border-radius: 6px 6px 0 0; font-weight: 700; font-size: 14px; text-align: center;">
      Proposed State
    </div>
    <div style="border: 1px solid var(--color-accent); border-top: none; border-radius: 0 0 6px 6px;
                padding: 20px; flex: 1;">
      <ul style="font-size: 14px; line-height: 1.8; padding-left: 16px;">
        <li><strong>2 approval layers</strong> (–3 eliminated)</li>
        <li><strong>7-day cycle time</strong> (–40%)</li>
        <li>Automated workflow routing</li>
        <li>Real-time dashboard tracking</li>
      </ul>
    </div>
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Process mapping workshops, Jan 2026</span>
  <span class="page-number">10</span>
</div>
```

---

## Process Flow / Diagram

For system architectures, process flows, decision trees. Built with CSS flexbox/grid — no external diagram libraries needed.

```html
<div class="slide-header">
  <h1 class="action-title">New customer onboarding process reduces touchpoints from 8 to 4</h1>
</div>

<div class="slide-body" style="align-items: center; justify-content: center;">

  <div style="display: flex; align-items: center; gap: 0; width: 100%;">

    <!-- Step 1 -->
    <div style="flex: 1; text-align: center;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <span style="color: white; font-size: 28px; font-weight: 700;">1</span>
      </div>
      <div style="font-size: 14px; font-weight: 600; margin-top: 12px;">Application</div>
      <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">Digital form<br>~5 min</div>
    </div>

    <!-- Connector -->
    <div style="width: 60px; height: 2px; background: var(--color-border); flex-shrink: 0;"></div>

    <!-- Step 2 -->
    <div style="flex: 1; text-align: center;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <span style="color: white; font-size: 28px; font-weight: 700;">2</span>
      </div>
      <div style="font-size: 14px; font-weight: 600; margin-top: 12px;">Verification</div>
      <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">Automated KYC<br>~2 hours</div>
    </div>

    <!-- Connector -->
    <div style="width: 60px; height: 2px; background: var(--color-border); flex-shrink: 0;"></div>

    <!-- Step 3 -->
    <div style="flex: 1; text-align: center;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <span style="color: white; font-size: 28px; font-weight: 700;">3</span>
      </div>
      <div style="font-size: 14px; font-weight: 600; margin-top: 12px;">Approval</div>
      <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">Single sign-off<br>~1 day</div>
    </div>

    <!-- Connector -->
    <div style="width: 60px; height: 2px; background: var(--color-border); flex-shrink: 0;"></div>

    <!-- Step 4 -->
    <div style="flex: 1; text-align: center;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-positive);
                  display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <span style="color: white; font-size: 28px; font-weight: 700;">✓</span>
      </div>
      <div style="font-size: 14px; font-weight: 600; margin-top: 12px;">Active</div>
      <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">Full access<br>granted</div>
    </div>

  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Customer experience redesign project</span>
  <span class="page-number">11</span>
</div>
```

---

## Icon Cards Grid

For listing capabilities, features, pillars, or initiatives. Uses emoji or Unicode symbols as lightweight icons.

```html
<div class="slide-header">
  <h1 class="action-title">Transformation rests on four strategic pillars, each with a dedicated workstream</h1>
</div>

<div class="slide-body" style="align-items: center;">
  <div class="grid-2x2" style="gap: 20px;">

    <div style="background: var(--color-light-muted); border-radius: 8px; padding: 24px;">
      <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; margin-bottom: 14px;">
        <span style="font-size: 22px;">⚡</span>
      </div>
      <div style="font-size: 16px; font-weight: 700; color: var(--color-dark); margin-bottom: 8px;">
        Operational Excellence
      </div>
      <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5;">
        Streamline processes, automate workflows, reduce operational cost by 25%
      </div>
    </div>

    <!-- Repeat for other 3 cards with different icons/colors -->

  </div>
</div>

<div class="slide-footer">
  <span class="source">Source: Transformation office</span>
  <span class="page-number">12</span>
</div>
```

---

## Explanatory with Sidebar

For long-form explanatory content that would be too dense as a wall of text. Breaks content into a main explanation area with a colored sidebar for key takeaways, definitions, or supporting facts.

```html
<div class="slide-header">
  <h1 class="action-title">Cognitive WhatsApp delivers higher resolution rates because it combines NLU with contextual customer data</h1>
</div>

<div class="slide-body" style="gap: 0;">

  <!-- Main content area (70%) -->
  <div style="flex: 7; padding-right: 32px; display: flex; flex-direction: column; gap: 20px; padding-top: 8px;">

    <div>
      <h3 style="font-size: 16px; font-weight: 700; color: var(--color-dark); margin-bottom: 8px;">
        How it works
      </h3>
      <p style="font-size: 14px; line-height: 1.7; color: var(--color-dark-muted);">
        The cognitive engine processes incoming messages through three layers: intent recognition,
        entity extraction, and context enrichment from the CRM. This allows the system to resolve
        requests that traditional chatbots escalate to human agents.
      </p>
    </div>

    <div>
      <h3 style="font-size: 16px; font-weight: 700; color: var(--color-dark); margin-bottom: 8px;">
        Why it matters
      </h3>
      <p style="font-size: 14px; line-height: 1.7; color: var(--color-dark-muted);">
        Each resolved interaction saves an average of R$12.40 in agent handling cost.
        At current volumes, the cognitive channel pays for itself within 4 months.
      </p>
    </div>

  </div>

  <!-- Sidebar (30%) -->
  <div style="flex: 3; background: var(--color-accent-light); border-radius: 8px; padding: 24px;
              display: flex; flex-direction: column; gap: 20px;">

    <div>
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
                  color: var(--color-accent); margin-bottom: 6px;">Key Metric</div>
      <div style="font-family: var(--font-heading); font-size: 32px; font-weight: 700;
                  color: var(--color-accent);">73%</div>
      <div style="font-size: 12px; color: var(--color-dark-muted);">First-contact resolution rate</div>
    </div>

    <div style="height: 1px; background: var(--color-border);"></div>

    <div>
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
                  color: var(--color-accent); margin-bottom: 6px;">Insight</div>
      <div style="font-size: 13px; line-height: 1.5; color: var(--color-dark-muted);">
        Top 5 intents account for 68% of all interactions — focus optimization there first.
      </div>
    </div>

  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Channel performance analysis, Q4 2025</span>
  <span class="page-number">05</span>
</div>
```

**Variations:**
- **Sidebar on left**: Swap the flex order — sidebar first, main content second. Works well when the sidebar contains a definition or context that frames the main content.
- **Sidebar as vertical stats column**: Replace text with 2-3 stacked metric cards.

---

## Explanatory Split (Text + Visual)

Text explanation on one side, supporting visual (diagram, image placeholder, or small chart) on the other. For when a concept needs both words and a picture.

```html
<div class="slide-header">
  <h1 class="action-title">The three-layer architecture separates customer-facing channels from backend intelligence</h1>
</div>

<div class="slide-body" style="gap: 36px; align-items: center;">

  <!-- Text side -->
  <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">

    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
        <span style="color: white; font-size: 13px; font-weight: 700;">1</span>
      </div>
      <div>
        <div style="font-size: 15px; font-weight: 600; color: var(--color-dark);">Channel Layer</div>
        <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5; margin-top: 2px;">
          WhatsApp, IVR, Web Chat — unified API gateway
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
        <span style="color: white; font-size: 13px; font-weight: 700;">2</span>
      </div>
      <div>
        <div style="font-size: 15px; font-weight: 600; color: var(--color-dark);">Intelligence Layer</div>
        <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5; margin-top: 2px;">
          NLU engine, dialog management, context enrichment
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-accent);
                  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
        <span style="color: white; font-size: 13px; font-weight: 700;">3</span>
      </div>
      <div>
        <div style="font-size: 15px; font-weight: 600; color: var(--color-dark);">Integration Layer</div>
        <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5; margin-top: 2px;">
          CRM, billing, knowledge base — real-time data access
        </div>
      </div>
    </div>

  </div>

  <!-- Visual side -->
  <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">

    <!-- Visual representation using CSS shapes -->
    <div style="background: var(--color-accent); border-radius: 8px; padding: 20px; text-align: center;">
      <div style="font-size: 14px; font-weight: 600; color: white;">Channel Layer</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
        WhatsApp · IVR · Web
      </div>
    </div>
    <div style="text-align: center; font-size: 18px; color: var(--color-muted);">↓</div>
    <div style="background: var(--color-accent-dark); border-radius: 8px; padding: 20px; text-align: center;">
      <div style="font-size: 14px; font-weight: 600; color: white;">Intelligence Layer</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
        NLU · Dialog · Context
      </div>
    </div>
    <div style="text-align: center; font-size: 18px; color: var(--color-muted);">↓</div>
    <div style="background: var(--color-dark-muted); border-radius: 8px; padding: 20px; text-align: center;">
      <div style="font-size: 14px; font-weight: 600; color: white;">Integration Layer</div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
        CRM · Billing · KB
      </div>
    </div>

  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Solution architecture design</span>
  <span class="page-number">06</span>
</div>
```

---

## Definition Slide

Clean introduction of a concept. Large term, clear definition, optional supporting details. Use when the audience needs to align on what something means before the analysis.

```html
<div class="slide-header">
  <h1 class="action-title">Defining "cognitive service" in the context of this engagement</h1>
</div>

<div class="slide-body" style="flex-direction: column; justify-content: center; padding: 0 80px;">

  <div style="font-family: var(--font-heading); font-size: 36px; font-weight: 700;
              color: var(--color-accent); margin-bottom: 16px;">
    Cognitive Service
  </div>

  <div style="font-size: 16px; line-height: 1.7; color: var(--color-dark); max-width: 800px;
              padding-left: 24px; border-left: 3px solid var(--color-accent);">
    An AI-augmented customer service operation that uses natural language understanding,
    contextual data enrichment, and automated decision-making to resolve customer requests
    without human intervention — while maintaining seamless escalation paths when needed.
  </div>

  <div style="display: flex; gap: 32px; margin-top: 36px;">
    <div style="flex: 1; background: var(--color-light-muted); border-radius: 6px; padding: 16px;">
      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase;
                  letter-spacing: 0.5px; color: var(--color-accent); margin-bottom: 6px;">Includes</div>
      <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5;">
        IVR cognitiva, WhatsApp com NLU, chatbots com acesso a CRM
      </div>
    </div>
    <div style="flex: 1; background: var(--color-light-muted); border-radius: 6px; padding: 16px;">
      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase;
                  letter-spacing: 0.5px; color: var(--color-muted); margin-bottom: 6px;">Does NOT include</div>
      <div style="font-size: 13px; color: var(--color-dark-muted); line-height: 1.5;">
        Rule-based IVR trees, keyword chatbots, email autoresponders
      </div>
    </div>
  </div>

</div>

<div class="slide-footer">
  <span class="source"></span>
  <span class="page-number">03</span>
</div>
```

---

## Quote Highlight

For testimonials, voice-of-customer insights, or powerful statements from stakeholders. The quote is the exhibit.

```html
<div class="slide-header">
  <h1 class="action-title">Customer interviews consistently cite channel fragmentation as the top pain point</h1>
</div>

<div class="slide-body" style="flex-direction: column; justify-content: center; align-items: center;
                                padding: 0 80px;">

  <div style="font-size: 64px; color: var(--color-accent); line-height: 1; font-family: Georgia, serif;
              margin-bottom: 8px; opacity: 0.3;">"</div>

  <blockquote style="font-family: var(--font-heading); font-size: 22px; font-weight: 400;
                     color: var(--color-dark); line-height: 1.6; text-align: center;
                     max-width: 800px; font-style: italic;">
    Every time I call, I have to explain my problem again from scratch.
    The IVR doesn't know I just spoke to someone on WhatsApp five minutes ago.
  </blockquote>

  <div style="margin-top: 24px; text-align: center;">
    <div style="font-size: 14px; font-weight: 600; color: var(--color-dark);">
      Customer Interview #14
    </div>
    <div style="font-size: 12px; color: var(--color-muted); margin-top: 2px;">
      Enterprise segment, 8+ year relationship
    </div>
  </div>

  <!-- Optional: supporting data below the quote -->
  <div style="display: flex; gap: 48px; margin-top: 36px; padding-top: 24px;
              border-top: 1px solid var(--color-border);">
    <div style="text-align: center;">
      <div style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                  color: var(--color-accent);">72%</div>
      <div style="font-size: 11px; color: var(--color-muted);">cited this issue</div>
    </div>
    <div style="text-align: center;">
      <div style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                  color: var(--color-negative);">3.2x</div>
      <div style="font-size: 11px; color: var(--color-muted);">more likely to churn</div>
    </div>
    <div style="text-align: center;">
      <div style="font-family: var(--font-heading); font-size: 28px; font-weight: 700;
                  color: var(--color-accent);">45</div>
      <div style="font-size: 11px; color: var(--color-muted);">interviews conducted</div>
    </div>
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Customer discovery interviews, Jan 2026</span>
  <span class="page-number">04</span>
</div>
```

---

## Pillar Columns

For 3-5 parallel concepts of equal weight — strategic pillars, workstreams, capability areas. Vertical columns with visual anchors.

```html
<div class="slide-header">
  <h1 class="action-title">The transformation program is organized around five capability pillars</h1>
</div>

<div class="slide-body" style="align-items: stretch; gap: 16px; padding-top: 12px;">

  <!-- Pillar 1 -->
  <div style="flex: 1; display: flex; flex-direction: column; border-radius: 8px; overflow: hidden;
              border: 1px solid var(--color-border);">
    <div style="background: var(--color-accent); padding: 16px; text-align: center;">
      <div style="font-size: 24px; margin-bottom: 4px;">🎯</div>
      <div style="font-size: 14px; font-weight: 700; color: var(--color-light);">Strategy</div>
    </div>
    <div style="padding: 16px; flex: 1; font-size: 12px; color: var(--color-dark-muted); line-height: 1.6;">
      <div style="margin-bottom: 6px;">• Channel strategy redesign</div>
      <div style="margin-bottom: 6px;">• Customer journey mapping</div>
      <div>• SLA framework</div>
    </div>
  </div>

  <!-- Pillar 2 -->
  <div style="flex: 1; display: flex; flex-direction: column; border-radius: 8px; overflow: hidden;
              border: 1px solid var(--color-border);">
    <div style="background: var(--color-accent-dark); padding: 16px; text-align: center;">
      <div style="font-size: 24px; margin-bottom: 4px;">⚙️</div>
      <div style="font-size: 14px; font-weight: 700; color: var(--color-light);">Technology</div>
    </div>
    <div style="padding: 16px; flex: 1; font-size: 12px; color: var(--color-dark-muted); line-height: 1.6;">
      <div style="margin-bottom: 6px;">• NLU engine deployment</div>
      <div style="margin-bottom: 6px;">• CRM integration</div>
      <div>• Analytics platform</div>
    </div>
  </div>

  <!-- Pillar 3-5: same structure, different colors/icons -->

</div>

<div class="slide-footer">
  <span class="source">Source: Transformation program charter</span>
  <span class="page-number">08</span>
</div>
```

---

## Two-Column Contrast

For binary comparisons: pros/cons, risks/opportunities, current/future, internal/external. Clear visual separation between sides.

```html
<div class="slide-header">
  <h1 class="action-title">Build vs. buy analysis favors a hybrid approach combining platform licensing with custom integration</h1>
</div>

<div class="slide-body" style="gap: 24px; padding-top: 12px;">

  <!-- Column A -->
  <div style="flex: 1; display: flex; flex-direction: column;">
    <div style="background: var(--color-accent); color: white; padding: 14px 20px;
                border-radius: 8px 8px 0 0; font-weight: 700; font-size: 16px; text-align: center;">
      Build In-House
    </div>
    <div style="border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 8px 8px;
                padding: 20px; flex: 1;">
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-positive);
                    margin-bottom: 8px;">✓ Advantages</div>
        <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark-muted);">
          <li>Full customization control</li>
          <li>IP ownership</li>
          <li>No license fees</li>
        </ul>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-negative);
                    margin-bottom: 8px;">✗ Disadvantages</div>
        <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark-muted);">
          <li>18-24 month timeline</li>
          <li>Requires 12+ FTE team</li>
          <li>Maintenance burden</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Column B -->
  <div style="flex: 1; display: flex; flex-direction: column;">
    <div style="background: var(--color-dark); color: white; padding: 14px 20px;
                border-radius: 8px 8px 0 0; font-weight: 700; font-size: 16px; text-align: center;">
      Buy Platform
    </div>
    <div style="border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 8px 8px;
                padding: 20px; flex: 1;">
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-positive);
                    margin-bottom: 8px;">✓ Advantages</div>
        <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark-muted);">
          <li>6-month deployment</li>
          <li>Proven at scale</li>
          <li>Vendor-managed updates</li>
        </ul>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--color-negative);
                    margin-bottom: 8px;">✗ Disadvantages</div>
        <ul style="font-size: 13px; line-height: 1.7; padding-left: 16px; color: var(--color-dark-muted);">
          <li>$800K+ annual license</li>
          <li>Limited customization</li>
          <li>Vendor dependency</li>
        </ul>
      </div>
    </div>
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Build vs buy assessment, vendor RFP responses</span>
  <span class="page-number">09</span>
</div>
```

---

## Scorecard / Status Tracker

For tracking initiatives, milestones, or workstreams with RAG (Red/Amber/Green) status indicators. Works well for steering committee updates.

```html
<div class="slide-header">
  <h1 class="action-title">Three of five workstreams are on track; data migration and training require intervention</h1>
</div>

<div class="slide-body" style="align-items: flex-start; padding-top: 12px;">
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 6%;">Status</th>
        <th style="width: 24%;">Workstream</th>
        <th style="width: 15%;">Owner</th>
        <th style="width: 10%;">Deadline</th>
        <th style="width: 10%;">Progress</th>
        <th style="width: 35%;">Key Issue / Next Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;"><span style="display: inline-block; width: 14px; height: 14px;
            border-radius: 50%; background: #2F855A;"></span></td>
        <td style="font-weight: 600;">Channel Integration</td>
        <td>M. Santos</td>
        <td>Apr 15</td>
        <td style="font-weight: 600; color: #2F855A;">85%</td>
        <td style="font-size: 12px;">API gateway testing complete, UAT next week</td>
      </tr>
      <tr>
        <td style="text-align: center;"><span style="display: inline-block; width: 14px; height: 14px;
            border-radius: 50%; background: #2F855A;"></span></td>
        <td style="font-weight: 600;">NLU Engine</td>
        <td>R. Lima</td>
        <td>May 01</td>
        <td style="font-weight: 600; color: #2F855A;">72%</td>
        <td style="font-size: 12px;">Intent model accuracy at 91%, tuning underway</td>
      </tr>
      <tr>
        <td style="text-align: center;"><span style="display: inline-block; width: 14px; height: 14px;
            border-radius: 50%; background: #E67E22;"></span></td>
        <td style="font-weight: 600;">Data Migration</td>
        <td>A. Costa</td>
        <td>Apr 30</td>
        <td style="font-weight: 600; color: #E67E22;">45%</td>
        <td style="font-size: 12px; color: var(--color-negative);"><strong>At risk:</strong> Legacy data quality issues blocking ETL pipeline</td>
      </tr>
      <tr>
        <td style="text-align: center;"><span style="display: inline-block; width: 14px; height: 14px;
            border-radius: 50%; background: #C53030;"></span></td>
        <td style="font-weight: 600;">Team Training</td>
        <td>F. Oliveira</td>
        <td>May 15</td>
        <td style="font-weight: 600; color: #C53030;">20%</td>
        <td style="font-size: 12px; color: var(--color-negative);"><strong>Blocked:</strong> Training environment not provisioned, need IT escalation</td>
      </tr>
      <tr>
        <td style="text-align: center;"><span style="display: inline-block; width: 14px; height: 14px;
            border-radius: 50%; background: #2F855A;"></span></td>
        <td style="font-weight: 600;">Governance Setup</td>
        <td>G. Pereira</td>
        <td>Mar 30</td>
        <td style="font-weight: 600; color: #2F855A;">95%</td>
        <td style="font-size: 12px;">RACI approved, steering cadence in place</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="slide-footer">
  <span class="source">Source: PMO weekly status report, Mar 10 2026</span>
  <span class="page-number">11</span>
</div>
```

---

## Pyramid Hierarchy

For showing hierarchical structures — organizational models, capability maturity levels, strategic priorities. 3-4 levels, widening from top to bottom.

```html
<div class="slide-header">
  <h1 class="action-title">Service maturity model defines four levels from reactive to predictive operations</h1>
</div>

<div class="slide-body" style="flex-direction: column; align-items: center; justify-content: center;
                                gap: 6px; padding: 0 48px;">

  <!-- Level 4 (top) -->
  <div style="width: 45%; background: var(--color-accent); border-radius: 6px; padding: 16px 24px;
              text-align: center;">
    <div style="font-size: 14px; font-weight: 700; color: white;">Level 4: Predictive</div>
    <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
      AI-driven proactive outreach, issue prevention
    </div>
  </div>

  <!-- Level 3 -->
  <div style="width: 60%; background: var(--color-accent-dark); border-radius: 6px; padding: 16px 24px;
              text-align: center;">
    <div style="font-size: 14px; font-weight: 700; color: white;">Level 3: Cognitive</div>
    <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
      NLU-based resolution, context-aware routing
    </div>
  </div>

  <!-- Level 2 -->
  <div style="width: 75%; background: var(--color-dark-muted); border-radius: 6px; padding: 16px 24px;
              text-align: center;">
    <div style="font-size: 14px; font-weight: 700; color: white;">Level 2: Automated</div>
    <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px;">
      Rule-based IVR, keyword chatbots, scripted flows
    </div>
  </div>

  <!-- Level 1 (bottom) -->
  <div style="width: 90%; background: var(--color-light-muted); border-radius: 6px; padding: 16px 24px;
              text-align: center; border: 1px solid var(--color-border);">
    <div style="font-size: 14px; font-weight: 700; color: var(--color-dark);">Level 1: Reactive</div>
    <div style="font-size: 11px; color: var(--color-muted); margin-top: 4px;">
      Manual agent handling, phone-only, no self-service
    </div>
  </div>

  <!-- Current state indicator -->
  <div style="margin-top: 16px; display: flex; align-items: center; gap: 8px;">
    <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--color-negative);"></div>
    <span style="font-size: 12px; color: var(--color-dark-muted);">
      Current state: transitioning from Level 2 to Level 3
    </span>
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Service maturity assessment framework</span>
  <span class="page-number">07</span>
</div>
```

---

## Funnel

For conversion funnels, pipeline stages, or any narrowing/filtering visualization. Shows progressive reduction with labels and drop-off rates.

```html
<div class="slide-header">
  <h1 class="action-title">Only 23% of inbound contacts reach resolution without human intervention — the biggest drop occurs at intent recognition</h1>
</div>

<div class="slide-body" style="flex-direction: column; align-items: center; justify-content: center;
                                gap: 4px; padding: 0 60px;">

  <!-- Stage 1 (widest) -->
  <div style="width: 100%; display: flex; align-items: center; gap: 16px;">
    <div style="flex: 1; background: var(--color-accent); border-radius: 6px; padding: 14px 24px;
                display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 14px; font-weight: 600; color: white;">Inbound Contacts</span>
      <span style="font-size: 20px; font-weight: 700; color: white;">100%</span>
    </div>
    <div style="width: 80px; text-align: center; font-size: 11px; color: var(--color-muted);">100K/mo</div>
  </div>

  <div style="font-size: 11px; color: var(--color-negative); text-align: center; padding: 2px 0;">
    ▼ 35% drop — channel routing failures
  </div>

  <!-- Stage 2 -->
  <div style="width: 80%; display: flex; align-items: center; gap: 16px; margin: 0 auto;">
    <div style="flex: 1; background: var(--color-accent); opacity: 0.85; border-radius: 6px; padding: 14px 24px;
                display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 14px; font-weight: 600; color: white;">Reach Cognitive Engine</span>
      <span style="font-size: 20px; font-weight: 700; color: white;">65%</span>
    </div>
    <div style="width: 80px; text-align: center; font-size: 11px; color: var(--color-muted);">65K/mo</div>
  </div>

  <div style="font-size: 11px; color: var(--color-negative); text-align: center; padding: 2px 0;">
    ▼ 24% drop — intent not recognized
  </div>

  <!-- Stage 3 -->
  <div style="width: 60%; display: flex; align-items: center; gap: 16px; margin: 0 auto;">
    <div style="flex: 1; background: var(--color-accent); opacity: 0.7; border-radius: 6px; padding: 14px 24px;
                display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 14px; font-weight: 600; color: white;">Intent Recognized</span>
      <span style="font-size: 20px; font-weight: 700; color: white;">41%</span>
    </div>
    <div style="width: 80px; text-align: center; font-size: 11px; color: var(--color-muted);">41K/mo</div>
  </div>

  <div style="font-size: 11px; color: var(--color-negative); text-align: center; padding: 2px 0;">
    ▼ 18% drop — resolution failure, escalated
  </div>

  <!-- Stage 4 (narrowest) -->
  <div style="width: 40%; display: flex; align-items: center; gap: 16px; margin: 0 auto;">
    <div style="flex: 1; background: var(--color-positive); border-radius: 6px; padding: 14px 24px;
                display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 14px; font-weight: 600; color: white;">Resolved Autonomously</span>
      <span style="font-size: 20px; font-weight: 700; color: white;">23%</span>
    </div>
    <div style="width: 80px; text-align: center; font-size: 11px; color: var(--color-muted);">23K/mo</div>
  </div>

</div>

<div class="slide-footer">
  <span class="source">Source: Contact center analytics, Feb 2026</span>
  <span class="page-number">06</span>
</div>
```

---

## Closing Slide

Clean ending. Can include next steps, contact info, or a strong closing statement.

```html
<div class="slide" style="background: var(--color-dark);">
  <div class="slide-body" style="flex-direction: column; justify-content: center; align-items: center;
                                  text-align: center; padding: 0 120px;">

    <div style="width: 48px; height: 3px; background: var(--color-accent); margin-bottom: 32px;"></div>

    <h2 style="font-family: var(--font-heading); font-size: 32px; font-weight: 700;
               color: var(--color-light); line-height: 1.3;">
      Thank You
    </h2>

    <p style="font-size: 16px; color: var(--color-muted); margin-top: 16px; max-width: 600px; line-height: 1.6;">
      We recommend approving the proposed transformation program at the March board meeting.
      The team is ready to begin Phase 1 immediately upon approval.
    </p>

    <div style="margin-top: 48px; font-size: 13px; color: var(--color-muted);">
      <div>Contact Name — title@company.com</div>
    </div>

  </div>
</div>
```

---

## Pattern Adaptation Notes

These patterns are starting points. When building actual slides:

1. **Mix patterns within a deck** — Never use the same layout twice in a row. If slide 3 is a bar chart, slide 4 should be a different pattern (table, split exhibit, big number, etc.)
2. **Adjust density to purpose** — Leave-behind decks can be denser; projected presentations need more breathing room
3. **Adapt grid columns** — 2-col, 3-col, 4-col based on content volume
4. **Combine patterns** — A slide might use big-number callout at top + bar chart below
5. **Respect the action title** — The pattern serves the message, not the other way around
6. **Use section dividers for pacing** — In decks with 8+ slides, add section dividers every 3-5 content slides to give the audience mental breathing room
7. **Pair explanatory slides with data slides** — A concept explanation followed by a chart that proves it is a powerful one-two punch
8. **Vary between full-width and split layouts** — Alternate between slides that use the full body width and slides that split into columns to maintain visual rhythm
