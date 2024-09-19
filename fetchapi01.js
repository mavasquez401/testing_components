async function fetch_demo() {
  // Request the Reddit URL and save the response in "resp"
  const resp = await fetch('https://www.reddit.com/r/programming.json');

  // Use the .json() method to parse the response as JSON object
  console.log(await resp.json());
}

fetch_demo();

// not a good way to get information as it only strictly pulls json data.
// e.g. if web is in html and JSON, you would get an error
