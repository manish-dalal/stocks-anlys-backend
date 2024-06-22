import axios from 'axios'
import cron from 'node-cron'

cron.schedule('*/4 * * * *', async () => {
  // runs every 4 minute
  console.log('started at: ' + new Date().toLocaleString())
  if (process.env.KEEPLIVE_URL) {
    await axios.get(process.env.KEEPLIVE_URL)
    console.log('Keeplive request @', process.env.KEEPLIVE_URL)
  }
})
