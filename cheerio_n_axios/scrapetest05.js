const puppeteer = require('puppeteer');

async function scrapeCapitalGrilleMenu() {
  const browser = await puppeteer.launch({ headless: false }); // headless: true for production
  const page = await browser.newPage();

  // Go to the Capital Grille menu page
  await page.goto(
    'https://www.thecapitalgrille.com/menu/dinner/appetizers?setRestaurant=8074&cmpid=br:loc_ag:ie_ch:dry_ca:TCGYELP_sn:yelp_gt:newyork-ny-8074_pl:menu_rd:1067',
    { waitUntil: 'networkidle2' }
  );

  // Wait for the menu section to load
  await page.waitForSelector('.menu-item'); // Adjust selector based on actual menu structure

  // Scrape menu items
  const menuItems = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.menu-item').forEach((item) => {
      const name =
        item.querySelector('.menu-item-name')?.innerText || 'No name';
      const description =
        item.querySelector('.menu-item-description')?.innerText ||
        'No description';
      const price =
        item.querySelector('.menu-item-price')?.innerText || 'No price';
      items.push({ name, description, price });
    });
    return items;
  });

  console.log('Menu Items:', menuItems);

  await browser.close();
}

scrapeCapitalGrilleMenu();
