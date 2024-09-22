// // Pulls all the text from the website and outputs it to the console.
// // restaurant menu search, must provide website to the menu

// const puppeteer = require('puppeteer');

// async function extractTextFromWebsite() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Navigate to the webpage
//   await page.goto('https://www.thecapitalgrille.com/menu/dinner/appetizers', {
//     waitUntil: 'networkidle2',
//   });

//   // Extract text content from the body of the page
//   const textContent = await page.evaluate(() => {
//     return document.body.innerText; // Pulls all visible text content from the page
//   });

//   console.log(textContent); // Outputs the extracted text

//   await browser.close();
// }

// extractTextFromWebsite();

const puppeteer = require('puppeteer');

async function extractTextFromWebsite() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the webpage
  await page.goto(
    'https://www.thecapitalgrille.com/menu/dinner/appetizers?setRestaurant=8074&cmpid=br:loc_ag:ie_ch:dry_ca:TCGYELP_sn:yelp_gt:newyork-ny-8074_pl:menu_rd:1067',
    { waitUntil: 'networkidle2' }
  );

  // Extract text content from the body of the page
  const textContent = await page.evaluate(() => {
    return document.body.innerText; // Pulls all visible text content from the page
  });

  console.log(textContent); // Outputs the extracted text

  await browser.close();
}

extractTextFromWebsite();
