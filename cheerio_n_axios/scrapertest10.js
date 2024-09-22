const puppeteer = require('puppeteer');

async function searchAndClickMenu() {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for production
  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type the search query into the Google search box
  const query = 'The Capital Grille Providence menu'; // Replace with your search query
  await page.type('textarea[name="q"]', query);
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for the Knowledge Panel (on the right side) to load
  await page.waitForSelector('div[role="complementary"]'); // The Knowledge Panel is often marked with role="complementary"

  // Step 4: Click the "Menu" button using a CSS selector within the Knowledge Panel
  const menuButton = await page.$('div[role="complementary"] a'); // Target the "Menu" button within the panel

  if (menuButton) {
    await menuButton.click(); // Click the "Menu" button
    console.log('Clicked on the Menu button!');

    // Step 5: Wait for the menu page to load
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Step 6: Extract the text from the menu page
    const menuText = await page.evaluate(() => {
      return document.body.innerText; // Extract all visible text from the menu page
    });

    console.log('Menu Text:', menuText);
  } else {
    console.log('Menu button not found!');
  }

  await browser.close();
}

searchAndClickMenu();
