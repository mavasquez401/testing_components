const axios = require('axios');
const cheerio = require('cheerio');

// Fetch all HTML from the URL
async function fetchAllData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching the HTML: ${error}`);
  }
}

// Extract and print all data from the HTML
async function scrapeAllData(url) {
  const html = await fetchAllData(url);
  const $ = cheerio.load(html);

  // Select the body of the page, which includes all content
  const allData = $('body').html();

  console.log(allData); // Print all data in the body tag
}

const url = 'https://thebossauthenticthairi.smiledining.com/?2024082601';
scrapeAllData(url);
