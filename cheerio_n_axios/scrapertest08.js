const puppeteer = require('puppeteer');

async function scrapeGoogleRestaurantInfo(query) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Wait for the search bar and type the query (e.g., "The Capital Grille New York")
  await page.waitForSelector('input[name="q"]');
  await page.type('input[name="q"]', query);
  await page.keyboard.press('Enter');

  // Wait for search results to load
  await page.waitForSelector('.Sva75c'); // Wait for the specific element in the Google Knowledge Graph or search results

  // Extract the text from the specific div or section
  const restaurantInfo = await page.evaluate(() => {
    const element = document.querySelector('.Sva75c'); // Adjust the selector based on the part you're targeting
    return element ? element.innerText : 'No information found';
  });

  console.log('Restaurant Info:', restaurantInfo);

  await browser.close();
}

// Run the scraper with the restaurant's name as the search query
scrapeGoogleRestaurantInfo('The Capital Grille New York');
