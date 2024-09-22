const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function extractTextWithJsdom() {
  // Fetch the HTML content from Google search or restaurant page
  const { data } = await axios.get('https://www.google.com'); // Replace with Google or restaurant URL

  // Parse the HTML with jsdom
  const dom = new JSDOM(data);

  // Use DOM methods to extract text (similar to browser's querySelector)
  const element = dom.window.document.querySelector('.Sva75c'); // Replace with appropriate selector
  const text = element ? element.textContent : 'No content found';

  console.log('Extracted Text:', text);
}

extractTextWithJsdom();
