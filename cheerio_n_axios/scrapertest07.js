// Pulls all the text from the website and outputs it to the console.
// restaurant menu search, must provide website to the menu

const puppeteer = require('puppeteer');

async function extractTextFromWebsite() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the webpage
  await page.goto('https://www.campnowhereri.com/camp-nowhere-menu', {
    waitUntil: 'networkidle2',
  });

  // Extract text content from the body of the page
  const textContent = await page.evaluate(() => {
    return document.body.innerText; // Pulls all visible text content from the page
  });

  console.log(textContent); // Outputs the extracted text

  await browser.close();
}

extractTextFromWebsite();
