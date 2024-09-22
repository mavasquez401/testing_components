const puppeteer = require('puppeteer');

async function extractGoogleSearchText(query) {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for production, false for debugging
  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type the search query into the Google search box
  await page.type('textarea[name="q"]', query); // Search for "Olive Garden"
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for search results to load
  await page.waitForSelector('h3'); // Wait for titles to appear (h3 elements)

  // Step 4: Extract the search result text content
  const searchResults = await page.evaluate(() => {
    return document.body.innerText; // Extracts all visible text on the search result page
  });

  // Output the extracted text content
  console.log(searchResults);

  await browser.close();
}

// Example: Search for "Olive Garden"
extractGoogleSearchText('unos pizza menu warwick');
