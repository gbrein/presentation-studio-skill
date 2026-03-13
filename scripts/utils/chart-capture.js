/**
 * chart-capture.js — Puppeteer Chart Screenshot
 *
 * For slides containing Chart.js canvases, we can't parse them semantically
 * (the chart is rendered on a <canvas> by JavaScript). Instead, we render
 * the HTML in headless Chrome, screenshot the chart area, and embed it
 * as an image in the PPTX.
 *
 * This also serves as a fallback for any complex layout pattern that
 * the semantic parser can't handle well.
 */

const path = require('path');
const fs = require('fs');
const PUPPETEER_PATH = '/home/claude/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer';
const CHROME_PATH = '/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome';

// Bundled Chart.js for sandboxed environments where CDN is unreachable
const CHARTJS_LOCAL = path.join(__dirname, '..', 'assets', 'chart.umd.js');
let chartJsContent = null;
function getChartJs() {
  if (!chartJsContent && fs.existsSync(CHARTJS_LOCAL)) {
    chartJsContent = fs.readFileSync(CHARTJS_LOCAL, 'utf-8');
  }
  return chartJsContent;
}

let browserInstance = null;

/**
 * Get or create a shared browser instance.
 * Reusing the browser across multiple slides is much faster than
 * launching a new one each time.
 */
async function getBrowser() {
  if (!browserInstance) {
    const puppeteer = require(PUPPETEER_PATH);
    browserInstance = await puppeteer.launch({
      headless: 'new',
      executablePath: CHROME_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  }
  return browserInstance;
}

/**
 * Close the shared browser instance.
 * Call this when all slides have been processed.
 */
async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

/**
 * Capture a full-slide screenshot for chart slides or complex patterns.
 *
 * Renders the HTML file in headless Chrome at 1280x720 and takes a
 * screenshot of the body content area (excluding header/footer if
 * captureBodyOnly is true).
 *
 * @param {string} htmlFilePath — Absolute path to the .html file
 * @param {string} outputPath — Where to save the PNG screenshot
 * @param {object} options
 * @param {boolean} options.fullSlide — Capture entire slide (default: false, captures body only)
 * @returns {object} { path, width, height } of the saved image
 */
async function captureSlideImage(htmlFilePath, outputPath, options = {}) {
  const { fullSlide = false } = options;
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1280, height: 720 });

    // Intercept network requests:
    // - Serve bundled Chart.js when CDN is requested (sandbox can't reach CDN)
    // - Allow file:// and data: URLs
    // - Abort everything else (fonts, analytics, etc.) to prevent hanging
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.startsWith('file://') || url.startsWith('data:')) {
        req.continue();
      } else if (url.includes('chart.js') || url.includes('chart.umd')) {
        // Serve local Chart.js bundle instead of CDN
        const chartJs = getChartJs();
        if (chartJs) {
          req.respond({
            status: 200,
            contentType: 'application/javascript',
            body: chartJs,
          });
        } else {
          req.abort('blockedbyclient');
        }
      } else {
        req.abort('blockedbyclient');
      }
    });

    await page.goto(`file://${path.resolve(htmlFilePath)}`, {
      waitUntil: 'load',
      timeout: 10000,
    }).catch(() => { /* timeout on blocked externals is expected */ });

    // Wait for Chart.js to render (animations, layout)
    await new Promise(r => setTimeout(r, 1200));

    if (fullSlide) {
      await page.screenshot({ path: outputPath, type: 'png' });
      return { path: outputPath, width: 1280, height: 720 };
    }

    // Capture just the body area
    const bodyBox = await page.evaluate(() => {
      const body = document.querySelector('.slide-body');
      if (!body) return null;
      const rect = body.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    });

    if (bodyBox) {
      await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: bodyBox,
      });
      return { path: outputPath, width: bodyBox.width, height: bodyBox.height };
    }

    // Fallback: full slide
    await page.screenshot({ path: outputPath, type: 'png' });
    return { path: outputPath, width: 1280, height: 720 };
  } finally {
    await page.close();
  }
}

/**
 * Capture a full-slide screenshot for use as a slide background.
 * This is the fallback for any pattern the semantic converter can't handle.
 *
 * @param {string} htmlFilePath — Absolute path to .html file
 * @param {string} outputDir — Directory to save screenshots
 * @param {string} slideName — Base name for the output file (e.g., "slide-03")
 * @returns {object} { fullPath, bodyPath } — paths to the screenshots
 */
async function captureForConversion(htmlFilePath, outputDir, slideName) {
  const fs = require('fs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const fullPath = path.join(outputDir, `${slideName}-full.png`);
  const bodyPath = path.join(outputDir, `${slideName}-body.png`);

  await captureSlideImage(htmlFilePath, fullPath, { fullSlide: true });
  const bodyResult = await captureSlideImage(htmlFilePath, bodyPath, { fullSlide: false });

  return { fullPath, bodyPath, bodyWidth: bodyResult.width, bodyHeight: bodyResult.height };
}

module.exports = { captureSlideImage, captureForConversion, closeBrowser };
