//this test is to test https connection which is secure connection

// Import the "http" package
const http = require('https');

// Send a GET request to example.com and print the response
const req = http.request(
  'https://vgw-splash-page-frontend-71431835113b.herokuapp.com/',
  (res) => {
    const data = [];

    res.on('data', (_) => data.push(_));
    res.on('end', () => console.log(data.join()));
  }
);

//information this would give is the HTML code of the page

// Close the connection
req.end();
