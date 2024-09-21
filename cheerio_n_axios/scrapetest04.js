const puppeteer = require('puppeteer');

async function scrapeYelpCapitalGrilleMenu() {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for production
  const page = await browser.newPage();

  // Go directly to The Capital Grille Yelp page (New York example)
  await page.goto('https://www.yelp.com/biz/the-capital-grille-new-york', {
    waitUntil: 'networkidle2',
  });

  // Wait for the page to load completely
  await page.waitForSelector('h1'); // Waiting for the restaurant's name to ensure the page is loaded

  // Extract the menu links or any relevant menu content
  const menuLinks = await page.evaluate(() => {
    const links = [];
    // Look for any links or buttons that mention "Menu"
    document.querySelectorAll('a').forEach((link) => {
      if (link.innerText.toLowerCase().includes('menu')) {
        links.push({
          text: link.innerText,
          url: link.href,
        });
      }
    });
    return links;
  });

  console.log('Menu Links:', menuLinks);

  // Close the browser
  await browser.close();
}

scrapeYelpCapitalGrilleMenu();
