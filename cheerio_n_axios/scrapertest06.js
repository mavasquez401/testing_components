// this version can create a PDF of a website

const puppeteer = require('puppeteer');

async function generatePdfFromWebsite() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the webpage you want to turn into a PDF
  await page.goto(
    'https://www.thecapitalgrille.com/menu/lunch/appetizers-and-soups',
    { waitUntil: 'networkidle2' }
  );

  // Generate PDF
  await page.pdf({
    path: 'capital-grille-menu.pdf', // Path to save the PDF file
    format: 'A4', // Page format (you can adjust this if necessary)
    printBackground: true, // To include background images/colors in the PDF
  });

  console.log('PDF generated successfully!');

  await browser.close();
}

generatePdfFromWebsite();
