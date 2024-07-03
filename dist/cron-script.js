"use strict";

const axios = require('axios');
const apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint

const callApi = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error calling API:', error);
  }
};

// Call the API immediately on start
callApi();

// Set interval to call the API every 60 seconds (60000 milliseconds)
setInterval(callApi, 60000);