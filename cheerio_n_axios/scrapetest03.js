const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function searchCapitalGrilleMenu() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.google.com/ncr', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  await page.waitForSelector('input[name="q"]', { timeout: 60000 });

  // Type 'The Capital Grille menu'
  await page.type('input[name="q"]', 'The Capital Grille menu');
  await page.keyboard.press('Enter');

  // Wait for the search results
  await page.waitForSelector('h3', { timeout: 60000 });

  const results = await page.evaluate(() => {
    const menuLinks = [];
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      if (
        link.innerText.toLowerCase().includes('menu') ||
        link.href.toLowerCase().includes('menu')
      ) {
        menuLinks.push({
          title: link.innerText,
          url: link.href,
        });
      }
    });
    return menuLinks;
  });

  console.log('Menu Links:', results);

  await browser.close();
}

searchCapitalGrilleMenu();
