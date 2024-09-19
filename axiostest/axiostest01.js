// Import Axios
const axios = require('axios');
async function getForum() {
  try {
    // Request Reddit URL and "await" the response
    const response = await axios.get(
      'https://www.reddit.com/r/programming.json'
    );

    // Print the response, once available and get() returned
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

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
