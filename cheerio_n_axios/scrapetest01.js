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

// Extract and print all text content from the HTML
async function scrapeAllText(url) {
  const html = await fetchAllData(url);
  const $ = cheerio.load(html);

  // Select and extract the text content from the body of the page
  const allText = $('body').text();

  console.log(allText.trim()); // Print all the text content in the body tag
}

const url = 'https://thebossauthenticthairi.smiledining.com/?2024082601';
scrapeAllText(url);
