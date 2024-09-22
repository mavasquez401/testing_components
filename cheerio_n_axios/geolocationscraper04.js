const puppeteer = require('puppeteer');

async function extractTextFromWebsite() {
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser interactions
    defaultViewport: { width: 1200, height: 950 }, // Set window size
  });

  const page = await browser.newPage();

  // Step 1: Navigate to the Olive Garden Family Bundles page
  await page.goto(
    'https://www.olivegarden.com/menu/family-style-meals/family-bundles',
    { waitUntil: 'networkidle2' }
  );

  // Step 2: Wait for the search box to load
  await page.waitForSelector('input[type="search"]'); // Replace with actual selector for the search input if needed

  // Step 3: Type ZIP code 02908 into the search box
  await page.type('input[type="search"]', '02908'); // Adjust the selector if needed for the search box

  // Step 4: Wait for suggestions to appear and click the first option
  await page.waitForSelector('.suggestions-list'); // Replace with the actual selector for the suggestions list
  await page.keyboard.press('ArrowDown'); // Move to the first suggestion
  await page.keyboard.press('Enter'); // Select the first suggestion

  // Step 5: Wait for the page to load the results
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Step 6: Extract text content from the body of the page
  const textContent = await page.evaluate(() => {
    return document.body.innerText; // Pulls all visible text content from the page
  });

  console.log(textContent); // Outputs the extracted text

  await browser.close();
}

extractTextFromWebsite();
