const puppeteer = require('./node_modules/puppeteer-core');

const TARGET_URL = 'https://creva.id/app/rencana-bisnis-baru/sirenbis4';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/home/multipilar/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  const capturedNetwork = [];
  page.on('request', req => {
    if (!req.url().includes('static') && !req.url().includes('fonts') && !req.url().includes('png') && !req.url().includes('ico')) {
      capturedNetwork.push({
        method: req.method(),
        url: req.url(),
        postData: req.postData()
      });
    }
  });

  page.on('response', async res => {
    if (!res.url().includes('static') && !res.url().includes('fonts') && !res.url().includes('png') && !res.url().includes('ico')) {
      capturedNetwork.push({
        status: res.status(),
        url: res.url(),
        headers: res.headers()
      });
    }
  });

  console.log('=== UJI INTERAKSI 1: Navigasi Awal ke Endpoint SIRENBIS 4 ===');
  const res1 = await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
  console.log(`URL Tujuan: ${TARGET_URL}`);
  console.log(`URL Akhir : ${page.url()}`);
  console.log(`Status    : ${res1.status()}`);

  console.log('\n=== UJI INTERAKSI 2: Validasi Form Kosong (Client Validation) ===');
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    const validationMessage = await page.evaluate(() => {
      const input = document.querySelector('input.form-control');
      return input ? input.validationMessage : null;
    });
    console.log('Interaksi: Klik tombol submit dengan field kosong.');
    console.log(`Hasil Validasi Klien: "${validationMessage}"`);
  }

  console.log('\n=== UJI INTERAKSI 3: Percobaan Input Dummy (Tanpa Data Sensitif) ===');
  const inputs = await page.$$('input.form-control');
  if (inputs.length >= 2) {
    await inputs[0].type('dummy_observer@test.id');
    await inputs[1].type('invalid_dummy_pass');
    console.log('Interaksi: Input dummy username/password.');
    
    // Klik tombol login dan amati network
    const networkCountBefore = capturedNetwork.length;
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 2000));
    const newRequests = capturedNetwork.slice(networkCountBefore);
    console.log('Request yang terpicu saat submit:', newRequests);
    
    const feedbackText = await page.evaluate(() => {
      const fb = document.querySelector('.notification-toast, .invalid-feedback, .alert');
      return fb ? fb.innerText : null;
    });
    console.log('Respons Visual Klien:', feedbackText);
  }

  console.log('\n=== UJI INTERAKSI 4: Cek Header & Endpoint API Langsung (Content Negotiation) ===');
  try {
    const apiProbe = await page.evaluate(async (url) => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          redirect: 'manual'
        });
        return { status: res.status, type: res.type, redirected: res.redirected };
      } catch (e) {
        return { error: e.message };
      }
    }, TARGET_URL);
    console.log('Hasil Probe fetch manual (Accept: application/json):', apiProbe);
  } catch (err) {
    console.log('Probe fetch error:', err.message);
  }

  console.log('\n=== UJI INTERAKSI 5: Pemeriksaan Client Storage & Session Guard ===');
  const storageState = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookies: document.cookie
  }));
  console.log('Client Storage State:', storageState);

  await browser.close();
})();
