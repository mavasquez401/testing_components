const { chromium } = require('playwright');

async function scrapeGoogleWithPlaywright() {
  const browser = await chromium.launch({ headless: false }); // Set headless to true for production
  const page = await browser.newPage();

  // Go to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle' });

  // Type the search query (e.g., "The Capital Grille New York")
  await page.fill('input[name="q"]', 'The Capital Grille New York');
  await page.keyboard.press('Enter');

  // Wait for search results to load
  await page.waitForSelector('div.Sva75c'); // This is the class seen in your screenshot (adjust if needed)

  // Extract text from the specific part of the page
  const restaurantInfo = await page.$eval(
    'div.Sva75c',
    (element) => element.innerText
  ); // Adjust selector to target your desired content

  console.log('Extracted Restaurant Info:', restaurantInfo);

  // Close the browser
  await browser.close();
}

scrapeGoogleWithPlaywright();
