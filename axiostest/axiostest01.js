// Import Axios
const axios = require('axios');

axios
  // Request Reddit URL
  .get('https://www.reddit.com/r/programming.json')
  // Configure callback for the HTTP response
  .then((response) => {
    console.log(response);
  })
  // Configure error callback
  .catch((error) => {
    console.error(error);
  });
