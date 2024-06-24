import moment from 'moment'
import axios from 'axios'
import { positionModel } from './position.model'
import { httpStatus } from '../../utils/httpStatus'
import { runPythonScript, filterData } from '../../utils/scrapping'

const positions = {}
positions.index = async (req, res) => {
  const { date = '2024-06-21' } = req.query

  let positions = await positionModel.find({ date }, { _id: 0, text: 1, createdAt: 1 })
  return res.json({ positions })
}

positions.create = async (req, res) => {
  let data = await positionModel.create(req.body)
  return res.status(httpStatus.CREATED).json({ data })
}

positions.scraping = async (req, res) => {
  const python = await runPythonScript()
  console.log('python', python)
  const data = await filterData()
  const today = moment().format('YYYY-MM-DD')

  if (process.env.IS_SAME_ORIGIN === 'true') {
    let data1 = await positionModel.create({ text: JSON.stringify(data), date: today })
    return res.status(httpStatus.CREATED).json({ status: 'ok', data1 })
  } else {
    const response = await axios.post(process.env.DOC_POST_API, { text: JSON.stringify(data), date: today })
    return res.json({ status: 'ok', data: response.data.data })
  }
}

export { positions }
