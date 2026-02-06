const axios = require("axios");

// helper delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchExternalData() {
  const MAX_RETRIES = 3;
  const TIMEOUT = 3000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        { timeout: TIMEOUT }
      );

      return response.data;

    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw new Error("External API failed after 3 retries");
      }

      // wait before retry
      await delay(500);
    }
  }
}

module.exports = {
  fetchExternalData
};
