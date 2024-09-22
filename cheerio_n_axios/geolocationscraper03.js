// does not provide enough information to determine geolocation
// needs to pick specific location

const puppeteer = require('puppeteer');

async function extractTextFromWebsite() {
  const browser = await puppeteer.launch({
    headless: false, // Set to false if you want to see the browser window
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ], // Allow camera/microphone permissions
  });

  const context = browser.defaultBrowserContext();

  // Override permissions for the site (including geolocation)
  await context.overridePermissions('https://www.olivegarden.com', [
    'geolocation',
  ]);

  const page = await browser.newPage();

  // Set the desired geolocation (latitude, longitude, accuracy)
  await page.setGeolocation({
    latitude: 34.052235,
    longitude: -118.243683,
    accuracy: 100,
  }); // Example: Los Angeles, CA

  // Navigate to the Olive Garden Family Bundles page
  await page.goto(
    'https://www.olivegarden.com/menu/classic-entrees?cmpid=br:og_ag:ie_ch:ppc_pl:ad_ca:20779707115_adg:155245576003_adid:680835449980_kw:olive%20garden&gad_source=1&gclid=EAIaIQobChMIyoW5vpHXiAMVXmlHAR0RfB6MEAAYASABEgKIt_D_BwE',
    { waitUntil: 'networkidle2' }
  );

  // Extract text content from the body of the page
  const textContent = await page.evaluate(() => {
    return document.body.innerText; // Pulls all visible text content from the page
  });

  console.log(textContent); // Outputs the extracted text

  await browser.close();
}

extractTextFromWebsite();
