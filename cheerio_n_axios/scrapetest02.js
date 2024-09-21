const puppeteer = require('puppeteer');

async function scrapeAllData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the page to fully load

  // Get all the content from the page
  const allData = await page.content();

  console.log(allData); // Print all HTML content from the loaded page

  await browser.close();
}

const url = 'https://thebossauthenticthairi.smiledining.com/?2024082601';
scrapeAllData(url);
