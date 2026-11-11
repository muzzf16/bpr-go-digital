const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const TARGET_URL = process.argv[2] || 'https://creva.id/app/rencana-bisnis-baru/sirenbis4';
const SCREENSHOT_DIR = path.resolve(__dirname, '../screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/home/multipilar/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  // 1. Desktop Screenshot (1280px)
  await page.setViewport({ width: 1280, height: 800 });
  console.log(`[read_css] Loading desktop 1280px: ${TARGET_URL}`);
  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    const desktopPath = path.join(SCREENSHOT_DIR, 'desktop.png');
    await page.screenshot({ path: desktopPath, fullPage: false });
    console.log(`[read_css] Saved desktop screenshot to: ${desktopPath}`);
  } catch (err) {
    console.error('[read_css] Desktop screenshot failed:', err.message);
  }

  // 2. Computed CSS Extraction on Desktop view
  console.log(`[read_css] Extracting computed CSS for main components...`);
  const computedStyles = await page.evaluate(() => {
    const extract = (selector, label) => {
      const el = document.querySelector(selector);
      if (!el) return { label, selector, found: false };
      const cs = window.getComputedStyle(el);
      return {
        label,
        selector,
        found: true,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        border: cs.border,
        padding: cs.padding,
        margin: cs.margin,
        gap: cs.gap,
        display: cs.display
      };
    };

    return [
      extract('body', 'Global Body'),
      extract('h1, .text-3xl, .text-4xl', 'Heading Primary'),
      extract('h2, .text-xl, .text-2xl', 'Heading Secondary'),
      extract('input[type="text"], input:not([type="password"]):not([type="submit"]):not([type="hidden"])', 'Input Text'),
      extract('input[type="password"]', 'Input Password'),
      extract('button[type="submit"], .btn-primary, button', 'Submit Button / Primary Button'),
      extract('.card, .rounded-2xl, .rounded-xl, form', 'Card Container / Form Wrapper'),
      extract('label', 'Form Label'),
      extract('.alert, .invalid-feedback, .badge, .notification-toast', 'Feedback / Alert / Badge'),
      extract('.table, table, thead tr, tbody tr', 'Table Element (if any)')
    ];
  });

  console.log('\n--- COMPUTED CSS RESULTS ---');
  console.log(JSON.stringify(computedStyles, null, 2));

  // 3. Mobile Screenshot (375px)
  console.log(`\n[read_css] Loading mobile 375px...`);
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  try {
    const mobilePath = path.join(SCREENSHOT_DIR, 'mobile.png');
    await page.screenshot({ path: mobilePath, fullPage: false });
    console.log(`[read_css] Saved mobile screenshot to: ${mobilePath}`);
  } catch (err) {
    console.error('[read_css] Mobile screenshot failed:', err.message);
  }

  await browser.close();
})();

