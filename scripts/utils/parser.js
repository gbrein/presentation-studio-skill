/**
 * parser.js — HTML Slide Parser
 *
 * Parses our structured HTML slides into data objects that the converter
 * can turn into pptxgenjs calls. Relies on the consistent structure
 * defined by the slide-patterns in the skill.
 *
 * Key insight: we control the HTML generation (Phase 2), so the parser
 * can rely on known class names, zones, and structural patterns.
 */

const cheerio = require('cheerio');
const { parseInlineStyle, resolveVarValue, cssSizeToPt, toHex } = require('./styles');

// ── Slide Type Detection ────────────────────────────────────────────

function detectSlideType($) {
  const slide = $('.slide');
  const hasHeader = $('.slide-header').length > 0;
  const hasFooter = $('.slide-footer').length > 0;

  // Check for dark background in inline style OR in CSS
  const inlineStyle = slide.attr('style') || '';
  const allStyles = $('style').text() || '';
  const isDark = inlineStyle.includes('color-dark') || inlineStyle.includes('#1') || inlineStyle.includes('#0') ||
    (!hasHeader && !hasFooter && allStyles.match(/\.slide\s*\{[^}]*background\s*:\s*var\(--color-dark\)/s));

  if (!hasHeader && !hasFooter) {
    const text = slide.text().toLowerCase();

    // Closing indicators: specific phrases, not partial word matches
    const closingPatterns = [
      'thank you', 'obrigado', 'obrigada', 'agradecemos',
      'próximos passos', 'next steps',
      'dúvidas', 'perguntas',
    ];
    const isClosing = closingPatterns.some(p => text.includes(p));

    // Structural hint: covers use <h1>, closings tend to use <h2>
    const hasH1 = slide.find('h1').length > 0;
    const hasH2Only = !hasH1 && slide.find('h2').length > 0;

    if (isClosing || hasH2Only) {
      return 'closing';
    }

    // Section dividers have large numbers
    const hasLargeNumber = $('span').filter(function () {
      const style = parseInlineStyle($(this).attr('style') || '');
      const fs = parseFloat(style['font-size']) || 0;
      return fs >= 40 && /^\d{1,2}$/.test($(this).text().trim());
    }).length > 0;
    if (hasLargeNumber) return 'section-divider';
    return 'cover';
  }

  if (!hasFooter && isDark) return 'section-divider';
  return 'content';
}

// ── Content Pattern Detection ───────────────────────────────────────

function detectBodyPattern($) {
  const body = $('.slide-body');

  // Chart.js canvas → chart slide (will need screenshot)
  if (body.find('canvas').length > 0) return 'chart';

  // Data table
  if (body.find('table.data-table').length > 0) return 'table';

  // Metric cards (big numbers)
  if (body.find('.metric-card').length > 0) return 'big-number';

  // Grid 2x2 with distinct sections → could be framework or icon-cards
  if (body.find('.grid-2x2').length > 0) {
    // Framework matrix has axis labels or quadrant titles like "INVEST & GROW"
    if (body.text().match(/→|axis|quadrant|matrix/i) ||
        body.find('[style*="font-weight: 700"]').length >= 4) {
      return 'framework-matrix';
    }
    return 'icon-cards';
  }

  // Executive summary: ordered list + callout box
  if (body.find('.callout-box').length > 0 && body.find('ol, li').length >= 3) {
    return 'exec-summary';
  }

  // Before/after: two columns with contrasting headers
  const headers = body.find('[style*="border-radius: 6px 6px 0 0"], [style*="border-radius:6px 6px 0 0"]');
  if (headers.length === 2) return 'before-after';

  // Timeline: phase bars with milestones
  if (body.find('[style*="border-radius: 6px"]').length >= 3 &&
      body.find('ul, li').length >= 3) {
    return 'timeline';
  }

  // Funnel: progressively narrower bars
  const widthElements = body.children().filter(function () {
    const style = parseInlineStyle($(this).attr('style') || '');
    return style.width && style.width.includes('%');
  });
  if (widthElements.length >= 3) return 'funnel';

  // Pyramid: centered bars of increasing width
  if (body.find('[style*="text-align: center"]').length >= 3 &&
      body.find('[style*="border-radius"]').length >= 3) {
    return 'pyramid';
  }

  // Pillar columns: flex children with header bars
  if (body.find('[style*="flex: 1"]').length >= 3) return 'pillar-columns';

  // Quote: blockquote or large quotation mark
  if (body.find('blockquote').length > 0 || body.text().includes('\u201C')) return 'quote';

  // Sidebar layout: 70/30 split
  const flexChildren = body.children();
  if (flexChildren.length === 2) {
    const styles = flexChildren.map(function () {
      return parseInlineStyle($(this).attr('style') || '');
    }).get();
    if ((styles[0].flex === '7' && styles[1].flex === '3') ||
        (styles[0].flex === '3' && styles[1].flex === '7')) {
      return 'explanatory-sidebar';
    }
  }

  // Two-column layouts
  if (body.find('.grid-2col').length > 0 || body.find('.grid-3col').length > 0) {
    return 'grid-layout';
  }

  // Process flow: circles with numbers + connectors
  if (body.find('[style*="border-radius: 50%"]').length >= 3) return 'process-flow';

  // Scorecard: table with colored dots
  if (body.find('[style*="border-radius: 50%"][style*="width: 14px"]').length > 0) return 'scorecard';

  // Agenda: numbered items with descriptions
  const numberedItems = body.find('span').filter(function () {
    const style = parseInlineStyle($(this).attr('style') || '');
    return (parseFloat(style['font-size']) || 0) >= 24 && /^\d{1,2}$/.test($(this).text().trim());
  });
  if (numberedItems.length >= 3) return 'agenda';

  // Default: generic content
  return 'generic';
}

// ── Element Extractors ──────────────────────────────────────────────

function extractHeader($) {
  const header = $('.slide-header');
  if (!header.length) return null;
  return {
    actionTitle: header.find('.action-title').text().trim(),
  };
}

function extractFooter($) {
  const footer = $('.slide-footer');
  if (!footer.length) return null;
  return {
    source: footer.find('.source').text().trim(),
    pageNumber: footer.find('.page-number').text().trim(),
  };
}

function extractCoverData($) {
  const body = $('.slide-body');
  const elements = [];

  // Find title (largest text)
  body.find('h1, h2').each(function () {
    elements.push({
      type: 'title',
      text: $(this).text().trim(),
      style: parseInlineStyle($(this).attr('style') || ''),
    });
  });

  // Find subtitle (p tags)
  body.find('p').each(function () {
    elements.push({
      type: 'subtitle',
      text: $(this).text().trim(),
      style: parseInlineStyle($(this).attr('style') || ''),
    });
  });

  // Find metadata (presenter, date, etc.)
  body.find('div').filter(function () {
    const style = parseInlineStyle($(this).attr('style') || '');
    return (parseFloat(style['font-size']) || 99) <= 14;
  }).each(function () {
    const text = $(this).text().trim();
    if (text && !elements.some(e => e.text === text)) {
      elements.push({ type: 'metadata', text });
    }
  });

  return elements;
}

function extractMetricCards($) {
  const cards = [];
  $('.metric-card').each(function () {
    const card = $(this);
    cards.push({
      value:    card.find('.value').text().trim(),
      label:    card.find('.label').text().trim(),
      sublabel: card.find('.sublabel').text().trim(),
      trend:    card.find('[class*="trend"]').text().trim(),
      trendType: card.find('.trend-positive').length > 0 ? 'positive' : 'negative',
    });
  });
  return cards;
}

function extractTable($) {
  const table = $('table.data-table');
  if (!table.length) return null;

  const headers = [];
  table.find('thead th').each(function () {
    headers.push($(this).text().trim());
  });

  const rows = [];
  table.find('tbody tr').each(function () {
    const row = [];
    $(this).find('td').each(function () {
      const td = $(this);
      row.push({
        text: td.text().trim(),
        highlight: td.hasClass('highlight'),
        positive: td.hasClass('positive'),
        negative: td.hasClass('negative'),
        bold: td.attr('style')?.includes('font-weight: 600') || td.attr('style')?.includes('font-weight: 700'),
      });
    });
    rows.push(row);
  });

  // Detect highlighted column (accent-colored header)
  const highlightCol = [];
  table.find('thead th').each(function (i) {
    const style = $(this).attr('style') || '';
    if (style.includes('accent')) highlightCol.push(i);
  });

  return { headers, rows, highlightCol };
}

function extractExecSummary($) {
  const body = $('.slide-body');
  const findings = [];

  body.find('li, [style*="display: flex"]').each(function () {
    const text = $(this).text().trim();
    // Filter out non-finding items (too short or part of other structures)
    if (text.length > 10 && !text.startsWith('Bottom line')) {
      findings.push(text);
    }
  });

  const callout = body.find('.callout-box').text().trim();

  return { findings: findings.slice(0, 6), callout };
}

function extractTimelinePhases($) {
  const body = $('.slide-body');
  const phases = [];

  // Find phase bars (colored rectangles with titles)
  const bars = body.children().first().children();
  const milestoneContainer = body.children().last().children();

  bars.each(function (i) {
    const bar = $(this);
    const title = bar.find('div').first().text().trim();
    const duration = bar.find('div').last().text().trim();

    const milestones = [];
    if (milestoneContainer.eq(i).length) {
      milestoneContainer.eq(i).find('li').each(function () {
        milestones.push($(this).text().trim());
      });
    }

    if (title) {
      phases.push({ title, duration: duration !== title ? duration : '', milestones });
    }
  });

  return phases;
}

function extractGenericContent($) {
  const body = $('.slide-body');
  const elements = [];

  body.find('h2, h3').each(function () {
    elements.push({ type: 'heading', text: $(this).text().trim() });
  });

  body.find('p').each(function () {
    elements.push({ type: 'paragraph', text: $(this).text().trim() });
  });

  body.find('li').each(function () {
    elements.push({ type: 'bullet', text: $(this).text().trim() });
  });

  return elements;
}

// ── Main Parser ─────────────────────────────────────────────────────

/**
 * Parse a single HTML slide file into a structured SlideData object.
 *
 * @param {string} html — Raw HTML content
 * @param {string} filename — Original filename (for reference)
 * @returns {object} SlideData
 */
function parseSlideHTML(html, filename) {
  const $ = cheerio.load(html);
  const type = detectSlideType($);

  const slideData = {
    filename,
    type,
    header: extractHeader($),
    footer: extractFooter($),
    pattern: null,
    body: null,
    hasChart: $('canvas').length > 0,
    rawHTML: html,
  };

  if (type === 'cover' || type === 'closing') {
    slideData.body = { elements: extractCoverData($) };
    slideData.pattern = type;
  } else if (type === 'section-divider') {
    slideData.pattern = 'section-divider';
    const body = $('.slide-body');
    const number = body.find('span').filter(function () {
      return (parseFloat(parseInlineStyle($(this).attr('style') || '')['font-size']) || 0) >= 40;
    }).first().text().trim();
    const title = body.find('h2').text().trim();
    const subtitle = body.find('p').text().trim();
    slideData.body = { number, title, subtitle };
  } else {
    // Content slide — detect body pattern
    slideData.pattern = detectBodyPattern($);

    switch (slideData.pattern) {
      case 'big-number':
        slideData.body = { metrics: extractMetricCards($) };
        break;
      case 'table':
      case 'scorecard':
        slideData.body = { table: extractTable($) };
        break;
      case 'exec-summary':
        slideData.body = extractExecSummary($);
        break;
      case 'timeline':
        slideData.body = { phases: extractTimelinePhases($) };
        break;
      case 'chart':
        slideData.body = { chartType: 'screenshot-required' };
        break;
      default:
        slideData.body = { elements: extractGenericContent($) };
        break;
    }
  }

  return slideData;
}

module.exports = { parseSlideHTML, detectSlideType, detectBodyPattern };
