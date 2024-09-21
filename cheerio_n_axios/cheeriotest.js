// Import Cheerio
const cheerio = require('cheerio');

// Parse the provided HTML into a Cheerio object
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// Set the text of the "h2" tag and add an HTML class
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

// Print the modified HTML document
$.html();
// <h2 class="title welcome">Hello there!</h2>

console.log($.html());
