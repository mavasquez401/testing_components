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

getForum();
