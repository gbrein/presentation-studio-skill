/**
 * styles.js — CSS Variable Extraction
 *
 * Extracts :root CSS variables from HTML slide files and resolves
 * them into a palette/font configuration for pptxgenjs.
 *
 * Our slides define everything in :root, so we parse that once per deck
 * and reuse across all slides.
 */

/**
 * Extract CSS custom properties from an HTML string's <style> block.
 * Returns a flat object: { 'color-dark': '#1A2332', ... }
 */
function extractCSSVariables(html) {
  const vars = {};
  // Match :root { ... } block
  const rootMatch = html.match(/:root\s*\{([^}]+)\}/s);
  if (!rootMatch) return vars;

  const declarations = rootMatch[1];
  const re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(declarations)) !== null) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

/**
 * Convert extracted CSS variables into a pptxgenjs-ready palette.
 * Strips '#' from hex colors (pptxgenjs uses bare hex).
 */
function buildPalette(cssVars) {
  const hex = (key) => (cssVars[key] || '').replace('#', '');
  return {
    dark:        hex('color-dark')        || '1A2332',
    darkMuted:   hex('color-dark-muted')  || '3D4F63',
    light:       hex('color-light')       || 'FFFFFF',
    lightMuted:  hex('color-light-muted') || 'F4F5F7',
    accent:      hex('color-accent')      || '2B6CB0',
    accentLight: hex('color-accent-light')|| 'EBF2FA',
    accentDark:  hex('color-accent-dark') || '1E4D7B',
    positive:    hex('color-positive')    || '2F855A',
    negative:    hex('color-negative')    || 'C53030',
    muted:       hex('color-muted')       || '8896A4',
    border:      hex('color-border')      || 'DCE1E8',
    altRow:      hex('color-alt-row')     || 'F8F9FB',
  };
}

/**
 * Extract font families from CSS variables.
 * Falls back to safe defaults if not found.
 */
function buildFonts(cssVars) {
  const extract = (key, fallback) => {
    const raw = cssVars[key] || fallback;
    // Take the first font in the stack (before the comma)
    return raw.split(',')[0].replace(/['"]/g, '').trim();
  };
  return {
    heading: extract('font-heading', 'Georgia'),
    body:    extract('font-body', 'Calibri'),
  };
}

/**
 * Resolve a CSS value that may contain var() references.
 * E.g., "var(--color-accent, #2B6CB0)" → "#2B6CB0" (or resolved value)
 */
function resolveVarValue(value, cssVars) {
  if (!value) return '';
  return value.replace(/var\(\s*--([^,)]+)(?:\s*,\s*([^)]+))?\s*\)/g, (_, name, fallback) => {
    const resolved = cssVars[name.trim()];
    return resolved || (fallback ? fallback.trim() : '');
  });
}

/**
 * Parse an inline style string into an object.
 * "font-size: 22px; color: #333;" → { 'font-size': '22px', color: '#333' }
 */
function parseInlineStyle(styleStr) {
  if (!styleStr) return {};
  const obj = {};
  styleStr.split(';').forEach(decl => {
    const [prop, ...valParts] = decl.split(':');
    if (prop && valParts.length) {
      obj[prop.trim()] = valParts.join(':').trim();
    }
  });
  return obj;
}

/**
 * Extract font size in points from a CSS value.
 * "22px" → 16.5 (px * 0.75 = pt), "16pt" → 16
 */
function cssSizeToPt(value) {
  if (!value) return null;
  const match = value.match(/([\d.]+)\s*(px|pt|em|rem)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const unit = match[2];
  if (unit === 'pt') return num;
  if (unit === 'px') return num * 0.75;
  if (unit === 'em' || unit === 'rem') return num * 12; // rough approximation
  return null;
}

/**
 * Convert a hex color (with or without #) to bare hex for pptxgenjs.
 */
function toHex(color) {
  if (!color) return null;
  return color.replace('#', '').replace(/\s/g, '');
}

/**
 * Convert px value to inches for pptxgenjs positioning.
 * Our slides are 1280x720px = 13.33"x7.5" → exactly 96 px/inch.
 */
function pxToInch(px) {
  return parseFloat(px) / 96;
}

module.exports = {
  extractCSSVariables,
  buildPalette,
  buildFonts,
  resolveVarValue,
  parseInlineStyle,
  cssSizeToPt,
  toHex,
  pxToInch,
};
