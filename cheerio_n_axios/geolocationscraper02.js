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
  await context.overridePermissions('https://www.thecheesecakefactory.com', [
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
    'https://www.thecheesecakefactory.com/menu?_ga=2.235037761.1343091574.1727028108-1826415088.1727028108',
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
