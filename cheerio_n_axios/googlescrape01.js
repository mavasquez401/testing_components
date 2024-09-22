const puppeteer = require('puppeteer');

async function scrapeGoogleSearch(query) {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for production, false for debugging
    defaultViewport: { width: 1200, height: 950 },
  });

  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type the search query into the Google search box
  await page.type('textarea[name="q"]', query);
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for search results to load
  await page.waitForSelector('h3'); // Wait for the titles (which are in h3 elements)

  // Step 4: Extract search result data (titles, links, and snippets)
  const searchResults = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('div.g'); // Google search results container

    items.forEach((item) => {
      const title = item.querySelector('h3')
        ? item.querySelector('h3').innerText
        : null;
      const link = item.querySelector('a')
        ? item.querySelector('a').href
        : null;
      const snippet = item.querySelector('.VwiC3b')
        ? item.querySelector('.VwiC3b').innerText
        : null;

      if (title && link) {
        results.push({
          title,
          link,
          snippet,
        });
      }
    });

    return results;
  });

  // Step 5: Output the results to the console
  console.log(searchResults);

  await browser.close();
}

// Example: Search Google for "The Capital Grille Providence menu"
scrapeGoogleSearch('dogs');
