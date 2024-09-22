const puppeteer = require('puppeteer');

async function extractTextFromWebsite() {
  const browser = await puppeteer.launch({
    headless: true, // Change to false if you want to see the browser window
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ], // Allow camera/microphone permissions
  });

  const context = browser.defaultBrowserContext();

  // Override permissions for the site (including geolocation)
  await context.overridePermissions('https://www.thecapitalgrille.com', [
    'geolocation',
  ]);

  const page = await browser.newPage();

  // Set the desired geolocation (latitude, longitude, accuracy)
  await page.setGeolocation({
    latitude: 40.73061,
    longitude: -73.935242,
    accuracy: 100,
  }); // Example: New York, NY

  // Navigate to the webpage
  await page.goto(
    'https://www.thecapitalgrille.com/menu/dinner/appetizers?setRestaurant=8074&cmpid=br:loc_ag:ie_ch:dry_ca:TCGYELP_sn:yelp_gt:newyork-ny-8074_pl:menu_rd:1067',
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
