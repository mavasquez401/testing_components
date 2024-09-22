// working pull data need more correct information

const puppeteer = require('puppeteer');

async function searchAndScrape() {
  const browser = await puppeteer.launch({ headless: false }); // Headless mode enabled
  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type into the search box (using class 'gLFyf' or name 'q')
  const query = 'The Capital Grille New York menu'; // Replace this with your search query
  await page.type('textarea[name="q"]', query); // Use the 'name="q"' selector based on your screenshot
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for search results to load
  await page.waitForSelector('h3'); // Wait for the search results to load

  // Step 4: Extract the first link from the search results
  const firstLink = await page.evaluate(() => {
    const linkElement = document.querySelector('a h3'); // Get the first result's h3
    if (linkElement && linkElement.closest('a')) {
      return linkElement.closest('a').href; // Return the href of the closest anchor element
    }
    return null;
  });

  console.log('First Link:', firstLink);

  if (firstLink) {
    // Step 5: Navigate to the extracted link and scrape the content
    await page.goto(firstLink, { waitUntil: 'networkidle2' });

    // Step 6: Extract the text content from the page (adjust the selector as needed)
    const pageText = await page.evaluate(() => {
      return document.body.innerText; // Extract all visible text from the body
    });

    console.log('Page Text:', pageText);
  } else {
    console.log('No link found in the search results.');
  }

  await browser.close();
}

searchAndScrape();
