import moment from 'moment'
import { spawn } from 'child_process'
import { positionModel } from './position.model'
import { httpStatus } from '../../utils/httpStatus'

const positions = {}
positions.index = async (req, res) => {
  const { date = '2024-06-21' } = req.query
  const startDate = moment(date).startOf('day')
  const endDate = moment(date).endOf('day')

  let positions = await positionModel.find({ createdAt: { $gte: startDate, $lt: endDate } })
  return res.json({ positions })
}

positions.create = async (req, res) => {
  let data = await positionModel.create(req.body)
  return res.status(httpStatus.CREATED).json({ data })
}

positions.scraping = async (req, res) => {
  const python = spawn('python', ['download.py'])
  let largeDataSet = []

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    largeDataSet.push(data)
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    // send data to browser
    return res.send(largeDataSet.join(''))
  })

  return res.json({ status: 'ok' })
}

export { positions }
