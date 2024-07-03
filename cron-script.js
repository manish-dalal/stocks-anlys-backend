const axios = require('axios')

const apiUrl = 'http://localhost:4000/api/position/v1/scraping' // Replace with your API endpoint

const callApi = async () => {
  try {
    await axios.get(apiUrl)
    console.log('API Response:', new Date().toLocaleString())
  } catch (error) {
    console.error(new Date().toLocaleString(), 'Error calling API:', error.message)
  }
}

// Call the API immediately on start
callApi()

// Set interval to call the API every 60 seconds (60000 milliseconds)
setInterval(callApi, 30000)
