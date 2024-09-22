const puppeteer = require('puppeteer');

async function searchYelp(restaurantName, location) {
  const browser = await puppeteer.launch({
    headless: false, // Set to true if you don't want to see the browser
    defaultViewport: { width: 1200, height: 950 },
  });

  const page = await browser.newPage();

  // Step 1: Navigate to Yelp's homepage
  await page.goto('https://www.yelp.com/', { waitUntil: 'networkidle2' });

  // Step 2: Type the restaurant name and location in the search boxes with delays
  await page.type('input[name="find_desc"]', restaurantName); // Restaurant search box
  await page.waitForTimeout(2000); // Delay for 2 seconds to simulate human typing speed
  await page.type('input[name="find_loc"]', location); // Location search box
  await page.waitForTimeout(2000); // Delay for 2 seconds
  await page.keyboard.press('Enter'); // Press Enter to submit the search

  // Step 3: Wait for search results to load with an additional delay
  await page.waitForSelector('h4 > a');
  await page.waitForTimeout(3000); // Wait 3 seconds before extracting results

  // Step 4: Extract restaurant names and links
  const searchResults = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('h4 > a'); // Select all search result links

    items.forEach((item) => {
      const name = item.innerText; // Extract the restaurant name
      const link = item.href; // Extract the restaurant link

      results.push({ name, link });
    });

    return results;
  });

  // Step 5: Filter through the results and pick the correct restaurant
  let selectedRestaurant = null;
  searchResults.forEach((result) => {
    if (result.name.toLowerCase().includes(restaurantName.toLowerCase())) {
      selectedRestaurant = result;
    }
  });

  if (selectedRestaurant) {
    console.log(`Found restaurant: ${selectedRestaurant.name}`);
    console.log(`Link: ${selectedRestaurant.link}`);

    // Step 6: Navigate to the selected restaurant's Yelp page with a delay
    await page.waitForTimeout(3000); // Add another 3-second delay
    await page.goto(selectedRestaurant.link, { waitUntil: 'networkidle2' });

    // Step 7: Extract some data from the restaurant's page (like phone number or address)
    const restaurantData = await page.evaluate(() => {
      const phone = document.querySelector('p .css-1p9ibgf')
        ? document.querySelector('p .css-1p9ibgf').innerText
        : 'Phone number not found';
      const address = document.querySelector('address')
        ? document.querySelector('address').innerText
        : 'Address not found';
      return { phone, address };
    });

    console.log('Restaurant Data:', restaurantData);
  } else {
    console.log('Restaurant not found.');
  }

  await browser.close();
}

// Search Yelp for 'The Capital Grille' in 'Providence, RI'
searchYelp('The Capital Grille', 'Providence, RI');
