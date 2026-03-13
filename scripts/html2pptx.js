#!/usr/bin/env node

/**
 * html2pptx.js — Convert HTML slides to PPTX
 *
 * CLI tool that takes a directory of HTML slide files (slide-01.html, slide-02.html, ...)
 * and produces a single .pptx file.
 *
 * Usage:
 *   node scripts/html2pptx.js --input ./slides/ --output presentation.pptx
 *   node scripts/html2pptx.js --input ./slides/ --output presentation.pptx --only 3,7,12
 *   node scripts/html2pptx.js --input ./slides/ --output presentation.pptx --manifest prev-manifest.json
 *
 * Options:
 *   --input     Directory containing slide-XX.html files (required)
 *   --output    Output .pptx file path (required)
 *   --only      Comma-separated slide numbers to re-convert (others use cached data)
 *   --manifest  Path to previous manifest.json for change detection
 *   --title     Presentation title (optional)
 *   --author    Author name (optional)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const PptxGenJS = require('pptxgenjs');
const { extractCSSVariables, buildPalette, buildFonts } = require('./utils/styles');
const { parseSlideHTML } = require('./utils/parser');
const { convertSlide, needsScreenshot } = require('./utils/converter');
const { captureForConversion, closeBrowser } = require('./utils/chart-capture');

// ── CLI Argument Parsing ────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input')    opts.input    = args[++i];
    if (args[i] === '--output')   opts.output   = args[++i];
    if (args[i] === '--only')     opts.only     = args[++i];
    if (args[i] === '--manifest') opts.manifest = args[++i];
    if (args[i] === '--title')    opts.title    = args[++i];
    if (args[i] === '--author')   opts.author   = args[++i];
  }
  if (!opts.input || !opts.output) {
    console.error('Usage: node html2pptx.js --input <dir> --output <file.pptx>');
    console.error('Options: --only 3,7 --manifest prev.json --title "Title" --author "Name"');
    process.exit(1);
  }
  return opts;
}

// ── File Discovery ──────────────────────────────────────────────────

function discoverSlides(inputDir) {
  const files = fs.readdirSync(inputDir)
    .filter(f => /^slide-\d+\.html$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  return files.map(f => ({
    filename: f,
    filepath: path.resolve(inputDir, f),
    number: parseInt(f.match(/\d+/)[0]),
  }));
}

// ── Change Detection ────────────────────────────────────────────────

function hashFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  return crypto.createHash('md5').update(content).digest('hex');
}

function detectChanges(slides, prevManifest) {
  if (!prevManifest) return slides.map(s => s.number); // all changed

  const changed = [];
  slides.forEach(s => {
    const hash = hashFile(s.filepath);
    if (!prevManifest[s.filename] || prevManifest[s.filename].hash !== hash) {
      changed.push(s.number);
    }
  });
  return changed;
}

function buildManifest(slides, slideDataMap) {
  const manifest = {};
  slides.forEach(s => {
    manifest[s.filename] = {
      hash: hashFile(s.filepath),
      pattern: slideDataMap[s.number]?.pattern || 'unknown',
      number: s.number,
    };
  });
  return manifest;
}

// ── Main Pipeline ───────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();
  const inputDir = path.resolve(opts.input);
  const outputFile = path.resolve(opts.output);
  const screenshotDir = path.join(inputDir, '.screenshots');

  console.log('\n📊 html2pptx — Converting HTML slides to PPTX');
  console.log(`   Input:  ${inputDir}`);
  console.log(`   Output: ${outputFile}\n`);

  // 1. Discover slide files
  const slides = discoverSlides(inputDir);
  if (slides.length === 0) {
    console.error('❌ No slide-XX.html files found in', inputDir);
    process.exit(1);
  }
  console.log(`📁 Found ${slides.length} slides`);

  // 2. Determine which slides to process
  let slidesToProcess;
  if (opts.only) {
    const onlyNums = opts.only.split(',').map(n => parseInt(n.trim()));
    slidesToProcess = onlyNums;
    console.log(`🔄 Re-converting only slides: ${onlyNums.join(', ')}`);
  } else if (opts.manifest && fs.existsSync(opts.manifest)) {
    const prevManifest = JSON.parse(fs.readFileSync(opts.manifest, 'utf-8'));
    slidesToProcess = detectChanges(slides, prevManifest);
    if (slidesToProcess.length === 0) {
      console.log('✅ No changes detected — skipping conversion');
      return;
    }
    console.log(`🔄 Changed slides detected: ${slidesToProcess.join(', ')}`);
  } else {
    slidesToProcess = slides.map(s => s.number);
  }

  // 3. Extract palette from first slide (shared across deck)
  const firstHTML = fs.readFileSync(slides[0].filepath, 'utf-8');
  const cssVars = extractCSSVariables(firstHTML);
  const palette = buildPalette(cssVars);
  const fonts = buildFonts(cssVars);
  console.log(`🎨 Palette: accent=#${palette.accent}, dark=#${palette.dark}`);
  console.log(`🔤 Fonts: ${fonts.heading} / ${fonts.body}`);

  // 4. Parse all slides
  console.log('\n⏳ Parsing slides...');
  const slideDataMap = {};

  for (const s of slides) {
    const html = fs.readFileSync(s.filepath, 'utf-8');
    const data = parseSlideHTML(html, s.filename);
    slideDataMap[s.number] = data;
    const status = slidesToProcess.includes(s.number) ? '🔄' : '⏩';
    console.log(`  ${status} ${s.filename} → ${data.type}/${data.pattern}`);
  }

  // 5. Capture screenshots for slides that need them
  const screenshotsNeeded = slides.filter(s =>
    slidesToProcess.includes(s.number) &&
    (slideDataMap[s.number].hasChart || needsScreenshot(slideDataMap[s.number].pattern))
  );

  const screenshotPaths = {};
  if (screenshotsNeeded.length > 0) {
    console.log(`\n📸 Capturing ${screenshotsNeeded.length} screenshots...`);
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    for (const s of screenshotsNeeded) {
      const name = s.filename.replace('.html', '');
      const result = await captureForConversion(s.filepath, screenshotDir, name);
      screenshotPaths[s.number] = result.bodyPath;
      console.log(`  📸 ${s.filename} → ${name}-body.png`);
    }
    await closeBrowser();
  }

  // Load cached screenshots for unchanged slides
  if (opts.manifest) {
    slides.forEach(s => {
      if (!slidesToProcess.includes(s.number) && needsScreenshot(slideDataMap[s.number]?.pattern)) {
        const name = s.filename.replace('.html', '');
        const cachedPath = path.join(screenshotDir, `${name}-body.png`);
        if (fs.existsSync(cachedPath)) {
          screenshotPaths[s.number] = cachedPath;
        }
      }
    });
  }

  // 6. Build PPTX
  console.log('\n🔨 Building PPTX...');
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = opts.author || 'Presentation Studio';
  pptx.title = opts.title || 'Presentation';

  for (const s of slides) {
    const data = slideDataMap[s.number];
    const screenshot = screenshotPaths[s.number] || null;
    convertSlide(pptx, data, palette, fonts, screenshot);
  }

  // 7. Write file
  await pptx.writeFile({ fileName: outputFile });
  console.log(`\n✅ PPTX saved to: ${outputFile}`);

  // 8. Save manifest for future change detection
  const manifestPath = outputFile.replace('.pptx', '-manifest.json');
  const manifest = buildManifest(slides, slideDataMap);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📋 Manifest saved to: ${manifestPath}`);

  console.log(`\n📊 Summary:`);
  console.log(`   Total slides: ${slides.length}`);
  console.log(`   Converted semantically: ${slides.length - screenshotsNeeded.length}`);
  console.log(`   Screenshot fallback: ${screenshotsNeeded.length}`);
  console.log('');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  closeBrowser().then(() => process.exit(1));
});
