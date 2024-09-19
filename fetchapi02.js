async function fetch_demo() {
  try {
    // Request the Reddit URL and save the response in "resp"
    const resp = await fetch('https://www.reddit.com/r/programming.json');

    // Check if the response content-type is JSON
    const contentType = resp.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Parse the response as JSON if it's in the right format
      const jsonData = await resp.json();
      console.log(jsonData);
    } else {
      console.log('Response is not JSON:', contentType);
      const textData = await resp.text();
      console.log(textData); // If it's HTML or something else, print the text response
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetch_demo();

// this example bypasses if the info is not in JSON and provides the HTML code instead.
// fetch is heavy with promises
