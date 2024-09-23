const puppeteer = require('puppeteer');

async function extractGoogleSearchText(query) {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for production, false for debugging
  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type the search query into the Google search box
  await page.type('textarea[name="q"]', query); // Search for "uno's pizza near warwick"
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for the search results to load
  await page.waitForSelector('h3'); // Wait for titles to appear (h3 elements)

  // Step 4: Wait for the Google Knowledge Panel to load (where the Menu button is located)
  await page.waitForSelector('div[role="complementary"]'); // Knowledge Panel section is within 'role="complementary"'

  // Step 5: Click on the "Menu" button inside the Knowledge Panel
  const menuButton = await page.$x("//a[contains(text(), 'Menu')]"); // XPath to find the "Menu" button
  if (menuButton.length > 0) {
    await menuButton[0].click(); // Click the first "Menu" button found
    console.log('Menu button clicked!');

    // Step 6: Wait for the new page to load after clicking the Menu button
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Step 7: Extract the text from the new page (the menu page)
    const menuText = await page.evaluate(() => document.body.innerText);

    // Output the extracted text content from the menu page
    console.log(menuText);
  } else {
    console.log('Menu button not found!');
  }

  await browser.close();
}

// Example: Search for "Uno's Pizza near Warwick" and click on the Menu button
extractGoogleSearchText("uno's pizza near warwick");
