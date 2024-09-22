const puppeteer = require('puppeteer');

async function searchAndClickMenu() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 950 },
  });

  const page = await browser.newPage();

  // Step 1: Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

  // Step 2: Type the search query into the Google search box
  const query = 'The Capital Grille Providence menu'; // Replace this with your search query
  await page.type('textarea[name="q"]', query);
  await page.keyboard.press('Enter'); // Simulate pressing the Enter key

  // Step 3: Wait for the search results to load
  await page.waitForSelector(
    '#\\37 08526C7-3AEE-4ADE-92FD-5C578E724058 .ab_button > div'
  ); // Using the CSS selector

  // Try the first selector: CSS
  const menuButtonCss = await page.$(
    '#\\37 08526C7-3AEE-4ADE-92FD-5C578E724058 .ab_button > div'
  );

  // Try the second selector: XPath idRelative
  const menuButtonXPathIdRelative = await page.$x(
    "//div[@id='708526C7-3AEE-4ADE-92FD-5C578E724058']/div/a/div"
  );

  // Try the third selector: XPath position
  const menuButtonXPathPosition = await page.$x(
    '//span[2]/div/div/div/div/a/div'
  );

  // Clicking based on the available element found
  if (menuButtonCss) {
    await menuButtonCss.click();
    console.log('Clicked on the Menu button (CSS selector)!');
  } else if (menuButtonXPathIdRelative.length > 0) {
    await menuButtonXPathIdRelative[0].click();
    console.log('Clicked on the Menu button (XPath ID Relative)!');
  } else if (menuButtonXPathPosition.length > 0) {
    await menuButtonXPathPosition[0].click();
    console.log('Clicked on the Menu button (XPath Position)!');
  } else {
    console.log('Menu button not found with any selector.');
  }

  // Step 5: Wait for the menu page to load
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Step 6: Extract the text from the menu page
  const menuText = await page.evaluate(() => {
    return document.body.innerText; // Extract all visible text from the menu page
  });

  console.log('Menu Text:', menuText);

  await browser.close();
}

searchAndClickMenu();
