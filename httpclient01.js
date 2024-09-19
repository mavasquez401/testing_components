//this test is for http non secure connection

// Import the "http" package
const http = require('http');

// Send a GET request to example.com and print the response
const req = http.request('http://example.com', (res) => {
  const data = [];

  res.on('data', (_) => data.push(_));
  res.on('end', () => console.log(data.join()));
});

//information this would give is the HTML code of the page

// Close the connection
req.end();
