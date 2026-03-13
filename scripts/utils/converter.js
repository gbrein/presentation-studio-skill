/**
 * converter.js — SlideData → pptxgenjs Converter
 *
 * Takes parsed SlideData objects and produces pptxgenjs slides.
 * Uses LAYOUT_WIDE (13.33" x 7.5") to match our 1280x720 HTML slides.
 *
 * Conversion factor: 96 px = 1 inch (1280px / 13.33" ≈ 96)
 *
 * Handles common patterns semantically (editable text, tables, shapes).
 * Falls back to embedded screenshots for charts and complex layouts.
 */

const path = require('path');
const fs = require('fs');

// ── Layout Constants (inches) ───────────────────────────────────────

const LAYOUT = {
  width:  13.33,
  height: 7.5,
  margin: { left: 0.5, right: 0.5, top: 0.25, bottom: 0.17 },
  header: { y: 0.25, h: 0.83, dividerY: 1.09 },
  body:   { y: 1.15, h: 5.85, left: 0.5, width: 12.33 },
  footer: { y: 7.08, h: 0.33 },
};

// ── Shared Helpers ──────────────────────────────────────────────────

function addActionTitle(slide, text, palette, fonts) {
  if (!text) return;
  slide.addText(text, {
    x: LAYOUT.margin.left, y: LAYOUT.header.y,
    w: LAYOUT.body.width, h: 0.73,
    fontSize: 16.5, fontFace: fonts.heading,
    color: palette.dark, bold: true,
    align: 'left', valign: 'top',
  });
  // Divider line
  slide.addShape('line', {
    x: LAYOUT.margin.left, y: LAYOUT.header.dividerY,
    w: LAYOUT.body.width, h: 0,
    line: { color: palette.accent, width: 1.5 },
  });
}

function addFooter(slide, footer, palette, fonts) {
  if (!footer) return;
  if (footer.source) {
    slide.addText(footer.source, {
      x: LAYOUT.margin.left, y: LAYOUT.footer.y,
      w: 10, h: LAYOUT.footer.h,
      fontSize: 7.5, fontFace: fonts.body,
      color: palette.muted, italic: true, align: 'left',
    });
  }
  if (footer.pageNumber) {
    slide.addText(footer.pageNumber, {
      x: 11.5, y: LAYOUT.footer.y,
      w: 1.33, h: LAYOUT.footer.h,
      fontSize: 7.5, fontFace: fonts.body,
      color: palette.muted, bold: true, align: 'right',
    });
  }
}

function newContentSlide(pptx, slideData, palette, fonts) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.light };
  addActionTitle(slide, slideData.header?.actionTitle, palette, fonts);
  addFooter(slide, slideData.footer, palette, fonts);
  return slide;
}

// ── Pattern Converters ──────────────────────────────────────────────

function convertCover(pptx, slideData, palette, fonts) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.dark };

  const elems = slideData.body?.elements || [];
  const title = elems.find(e => e.type === 'title');
  const subtitle = elems.find(e => e.type === 'subtitle');
  const metadata = elems.find(e => e.type === 'metadata');

  // Accent bar
  slide.addShape('rect', {
    x: 0.83, y: 2.5, w: 0.63, h: 0.03,
    fill: { color: palette.accent },
  });

  if (title) {
    slide.addText(title.text, {
      x: 0.83, y: 2.7, w: 9.5, h: 1.5,
      fontSize: 33, fontFace: fonts.heading,
      color: palette.light, bold: true, align: 'left',
    });
  }

  if (subtitle) {
    slide.addText(subtitle.text, {
      x: 0.83, y: 4.3, w: 9.5, h: 0.7,
      fontSize: 13.5, fontFace: fonts.body,
      color: palette.muted, align: 'left',
    });
  }

  if (metadata) {
    slide.addText(metadata.text, {
      x: 0.83, y: 5.8, w: 9.5, h: 0.4,
      fontSize: 9.75, fontFace: fonts.body,
      color: palette.muted, align: 'left',
    });
  }

  return slide;
}

function convertSectionDivider(pptx, slideData, palette, fonts) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.dark };
  const { number, title, subtitle } = slideData.body || {};

  if (number) {
    slide.addText(number, {
      x: 0.83, y: 2.1, w: 2.0, h: 1.0,
      fontSize: 42, fontFace: fonts.heading,
      color: palette.accent, bold: true, align: 'left',
    });
  }

  if (title) {
    slide.addText(title, {
      x: 0.83, y: 3.3, w: 10.0, h: 1.0,
      fontSize: 24, fontFace: fonts.heading,
      color: palette.light, bold: true, align: 'left',
    });
  }

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.83, y: 4.4, w: 8.0, h: 0.5,
      fontSize: 11.25, fontFace: fonts.body,
      color: palette.muted, align: 'left',
    });
  }

  return slide;
}

function convertClosing(pptx, slideData, palette, fonts) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.dark };
  const elems = slideData.body?.elements || [];

  // Accent bar
  slide.addShape('rect', {
    x: 6.17, y: 2.7, w: 0.5, h: 0.03,
    fill: { color: palette.accent },
  });

  const title = elems.find(e => e.type === 'title');
  const subtitle = elems.find(e => e.type === 'subtitle');
  const metadata = elems.find(e => e.type === 'metadata');

  if (title) {
    slide.addText(title.text, {
      x: 2.0, y: 3.0, w: 9.33, h: 1.0,
      fontSize: 24, fontFace: fonts.heading,
      color: palette.light, bold: true, align: 'center',
    });
  }

  if (subtitle) {
    slide.addText(subtitle.text, {
      x: 2.5, y: 4.2, w: 8.33, h: 1.2,
      fontSize: 12, fontFace: fonts.body,
      color: palette.muted, align: 'center',
    });
  }

  if (metadata) {
    slide.addText(metadata.text, {
      x: 3.0, y: 5.8, w: 7.33, h: 0.4,
      fontSize: 9.75, fontFace: fonts.body,
      color: palette.muted, align: 'center',
    });
  }

  return slide;
}

function convertBigNumber(pptx, slideData, palette, fonts) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);
  const metrics = slideData.body?.metrics || [];
  const count = metrics.length || 1;
  const cellW = LAYOUT.body.width / count;
  const startX = LAYOUT.margin.left;

  metrics.forEach((m, i) => {
    const x = startX + i * cellW;

    // Vertical separator (except first)
    if (i > 0) {
      slide.addShape('line', {
        x, y: LAYOUT.body.y + 0.5, w: 0, h: 3.5,
        line: { color: palette.border, width: 0.5 },
      });
    }

    slide.addText(m.value, {
      x, y: LAYOUT.body.y + 0.8, w: cellW, h: 1.4,
      fontSize: 39, fontFace: fonts.heading,
      color: palette.accent, bold: true, align: 'center', valign: 'bottom',
    });

    slide.addText(m.label, {
      x, y: LAYOUT.body.y + 2.3, w: cellW, h: 0.5,
      fontSize: 12, fontFace: fonts.body,
      color: palette.dark, bold: true, align: 'center',
    });

    if (m.sublabel) {
      slide.addText(m.sublabel, {
        x, y: LAYOUT.body.y + 2.8, w: cellW, h: 0.4,
        fontSize: 9, fontFace: fonts.body,
        color: palette.muted, align: 'center',
      });
    }

    if (m.trend) {
      slide.addText(m.trend, {
        x, y: LAYOUT.body.y + 3.2, w: cellW, h: 0.35,
        fontSize: 10.5, fontFace: fonts.body,
        color: m.trendType === 'positive' ? palette.positive : palette.negative,
        bold: true, align: 'center',
      });
    }
  });

  return slide;
}

function convertTable(pptx, slideData, palette, fonts) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);
  const { headers, rows, highlightCol } = slideData.body?.table || { headers: [], rows: [] };

  const colW = headers.map(() => LAYOUT.body.width / headers.length);

  const tableRows = [
    // Header row
    headers.map((h, i) => ({
      text: h,
      options: {
        fontSize: 9, fontFace: fonts.heading, color: palette.light,
        bold: true, fill: { color: highlightCol?.includes(i) ? palette.accent : palette.dark },
        align: 'center', border: { type: 'solid', color: palette.dark, pt: 0.5 },
      },
    })),
    // Data rows
    ...rows.map((row, ri) =>
      row.map((cell) => ({
        text: cell.text,
        options: {
          fontSize: 8, fontFace: fonts.body,
          color: cell.positive ? palette.positive : cell.negative ? palette.negative :
                 cell.highlight ? palette.accent : palette.dark,
          bold: cell.bold || cell.highlight,
          fill: { color: ri % 2 === 0 ? palette.light : palette.altRow },
          border: { type: 'solid', color: palette.border, pt: 0.3 },
          align: 'left', valign: 'middle',
        },
      }))
    ),
  ];

  slide.addTable(tableRows, {
    x: LAYOUT.margin.left, y: LAYOUT.body.y,
    w: LAYOUT.body.width, colW,
    rowH: [0.38, ...Array(rows.length).fill(0.33)],
    autoPage: true, autoPageRepeatHeader: true,
  });

  return slide;
}

function convertExecSummary(pptx, slideData, palette, fonts) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);
  const { findings, callout } = slideData.body || {};

  if (findings?.length) {
    const bulletText = findings.map((f, i) => ({
      text: `${i + 1}.  ${f}`,
      options: {
        fontSize: 11, fontFace: fonts.body, color: palette.dark,
        paraSpaceAfter: 6, lineSpacingMultiple: 1.2,
      },
    }));

    slide.addText(bulletText, {
      x: LAYOUT.margin.left, y: LAYOUT.body.y,
      w: LAYOUT.body.width, h: 3.5, valign: 'top',
    });
  }

  if (callout) {
    slide.addShape('rect', {
      x: LAYOUT.margin.left, y: LAYOUT.body.y + 3.8,
      w: LAYOUT.body.width, h: 1.0,
      fill: { color: palette.accentLight }, rectRadius: 0.05,
    });
    slide.addShape('rect', {
      x: LAYOUT.margin.left, y: LAYOUT.body.y + 3.8,
      w: 0.04, h: 1.0,
      fill: { color: palette.accent },
    });
    slide.addText(callout, {
      x: LAYOUT.margin.left + 0.2, y: LAYOUT.body.y + 3.9,
      w: LAYOUT.body.width - 0.4, h: 0.8,
      fontSize: 10.5, fontFace: fonts.body, color: palette.dark,
      bold: true, valign: 'middle',
    });
  }

  return slide;
}

function convertTimeline(pptx, slideData, palette, fonts) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);
  const phases = slideData.body?.phases || [];
  const count = phases.length || 1;
  const phaseW = (LAYOUT.body.width - 0.2) / count;
  const startX = LAYOUT.margin.left;
  const barColors = [palette.accent, palette.accentDark, palette.darkMuted];

  phases.forEach((phase, i) => {
    const x = startX + i * (phaseW + 0.07);

    // Phase bar
    slide.addShape('rect', {
      x, y: LAYOUT.body.y, w: phaseW - 0.07, h: 0.65,
      fill: { color: barColors[i % barColors.length] }, rectRadius: 0.04,
    });
    slide.addText(phase.title, {
      x: x + 0.1, y: LAYOUT.body.y + 0.05, w: phaseW - 0.3, h: 0.35,
      fontSize: 10.5, fontFace: fonts.heading, color: palette.light,
      bold: true, align: 'center',
    });
    if (phase.duration) {
      slide.addText(phase.duration, {
        x: x + 0.1, y: LAYOUT.body.y + 0.38, w: phaseW - 0.3, h: 0.22,
        fontSize: 8, fontFace: fonts.body, color: 'FFFFFFB3', align: 'center',
      });
    }

    // Milestones
    if (phase.milestones?.length) {
      const msText = phase.milestones.map(m => ({
        text: `• ${m}`,
        options: { fontSize: 9.75, fontFace: fonts.body, color: palette.dark,
                   paraSpaceAfter: 3, lineSpacingMultiple: 1.3 },
      }));
      slide.addText(msText, {
        x: x + 0.05, y: LAYOUT.body.y + 0.85, w: phaseW - 0.15, h: 3.5,
        valign: 'top',
      });
    }
  });

  return slide;
}

/**
 * Fallback: embed a screenshot of the slide body area.
 * Used for charts, complex layouts, and any unhandled pattern.
 */
function convertWithScreenshot(pptx, slideData, palette, fonts, screenshotPath) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);

  if (screenshotPath && fs.existsSync(screenshotPath)) {
    slide.addImage({
      path: screenshotPath,
      x: LAYOUT.margin.left, y: LAYOUT.body.y,
      w: LAYOUT.body.width, h: LAYOUT.body.h - 0.5,
      sizing: { type: 'contain', w: LAYOUT.body.width, h: LAYOUT.body.h - 0.5 },
    });
  }

  return slide;
}

function convertGeneric(pptx, slideData, palette, fonts) {
  const slide = newContentSlide(pptx, slideData, palette, fonts);
  const elements = slideData.body?.elements || [];

  let currentY = LAYOUT.body.y;

  elements.forEach(el => {
    if (el.type === 'heading') {
      slide.addText(el.text, {
        x: LAYOUT.margin.left, y: currentY, w: LAYOUT.body.width, h: 0.4,
        fontSize: 13.5, fontFace: fonts.heading, color: palette.dark,
        bold: true, align: 'left',
      });
      currentY += 0.45;
    } else if (el.type === 'paragraph') {
      slide.addText(el.text, {
        x: LAYOUT.margin.left, y: currentY, w: LAYOUT.body.width, h: 0.6,
        fontSize: 10.5, fontFace: fonts.body, color: palette.darkMuted,
        align: 'left', lineSpacingMultiple: 1.3,
      });
      currentY += 0.65;
    } else if (el.type === 'bullet') {
      slide.addText(`• ${el.text}`, {
        x: LAYOUT.margin.left + 0.15, y: currentY, w: LAYOUT.body.width - 0.3, h: 0.35,
        fontSize: 10.5, fontFace: fonts.body, color: palette.dark, align: 'left',
      });
      currentY += 0.35;
    }
  });

  return slide;
}

// ── Main Converter ──────────────────────────────────────────────────

/**
 * Convert a SlideData object into a pptxgenjs slide.
 *
 * @param {PptxGenJS} pptx — The presentation object
 * @param {object} slideData — Parsed slide data from parser.js
 * @param {object} palette — Color palette (bare hex values)
 * @param {object} fonts — Font configuration { heading, body }
 * @param {string|null} screenshotPath — Path to body screenshot (for charts/fallback)
 * @returns {Slide} The created slide
 */
function convertSlide(pptx, slideData, palette, fonts, screenshotPath = null) {
  const pattern = slideData.pattern || slideData.type;

  switch (pattern) {
    case 'cover':           return convertCover(pptx, slideData, palette, fonts);
    case 'section-divider': return convertSectionDivider(pptx, slideData, palette, fonts);
    case 'closing':         return convertClosing(pptx, slideData, palette, fonts);
    case 'big-number':      return convertBigNumber(pptx, slideData, palette, fonts);
    case 'table':           return convertTable(pptx, slideData, palette, fonts);
    case 'scorecard':       return convertTable(pptx, slideData, palette, fonts);
    case 'exec-summary':    return convertExecSummary(pptx, slideData, palette, fonts);
    case 'timeline':        return convertTimeline(pptx, slideData, palette, fonts);
    case 'chart':           return convertWithScreenshot(pptx, slideData, palette, fonts, screenshotPath);
    case 'generic':         return convertGeneric(pptx, slideData, palette, fonts);
    default:
      // Complex patterns (framework, funnel, pyramid, etc.) → screenshot fallback
      if (screenshotPath) {
        return convertWithScreenshot(pptx, slideData, palette, fonts, screenshotPath);
      }
      return convertGeneric(pptx, slideData, palette, fonts);
  }
}

// Patterns that need Puppeteer screenshots (can't be fully parsed semantically)
const SCREENSHOT_PATTERNS = new Set([
  'chart', 'framework-matrix', 'funnel', 'pyramid', 'process-flow',
  'before-after', 'pillar-columns', 'explanatory-sidebar', 'icon-cards',
  'quote', 'grid-layout', 'agenda',
]);

function needsScreenshot(pattern) {
  return SCREENSHOT_PATTERNS.has(pattern);
}

module.exports = { convertSlide, needsScreenshot, LAYOUT };
