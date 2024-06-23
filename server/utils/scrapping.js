import fs from 'fs'
import csv from 'csvtojson'
import { spawn } from 'child_process'
const IGNORE_LIST = ['MIDCPNIFTY', 'FINNIFTY', 'BANKNIFTY', 'NIFTYNXT50', 'NIFTY']

const MIN_OI_CHANGE = 0.1

const MIN_CHANGE = 0.5

const gainerFileName1 = './scrap-data/g1.csv'
const gainerFileName2 = './scrap-data/g2.csv'
const gainerFileName3 = './scrap-data/g3.csv'
const losserFileName1 = './scrap-data/l1.csv'
const losserFileName2 = './scrap-data/l2.csv'
const losserFileName3 = './scrap-data/l3.csv'
const oiFileName = './scrap-data/o.csv'

const checkAndReadCsv = async (filepath) => {
  const isFileExists = fs.existsSync(filepath)
  const res = isFileExists ? await csv().fromFile(filepath) : []
  return res
}

export const filterData = async () => {
  const gainerData1 = await checkAndReadCsv(gainerFileName1)
  const gainerData2 = await checkAndReadCsv(gainerFileName2)
  const gainerData3 = await checkAndReadCsv(gainerFileName3)
  const gainerData = [...gainerData1, ...gainerData2, ...gainerData3]

  const lossData1 = await checkAndReadCsv(losserFileName1)
  const lossData2 = await checkAndReadCsv(losserFileName2)
  const lossData3 = await checkAndReadCsv(losserFileName3)
  const lossData = [...lossData1, ...lossData2, ...lossData3]
  const oiData = await csv().fromFile(oiFileName)

  const filteredGainerData = gainerData.filter((e) => Math.abs(parseFloat(e['%chng'])) >= MIN_CHANGE)
  const filteredLooserData = lossData.filter((e) => Math.abs(parseFloat(e['%chng'])) >= MIN_CHANGE)
  const allStocks = [...filteredGainerData, ...filteredLooserData]
  const allStocksMap = allStocks.reduce((prev, cur) => {
    return { ...prev, [cur['Symbol']]: cur }
  }, {})
  const filteredOiData = oiData.filter(
    (e) => parseFloat(e['%chng in OI']) >= MIN_OI_CHANGE && !IGNORE_LIST.includes(e['Symbol'])
  )

  return filteredOiData.filter((item) => allStocksMap[item['Symbol']])
}

export const runPythonScript = () =>
  new Promise(async (resolve, reject) => {
    try {
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
        // return res.send(largeDataSet.join(''))
        console.log('largeDataSet', largeDataSet)
        return resolve({})
      })
      python.on('error', (error) => {
        console.log(`child process error`, error)
        return resolve({})
      })
    } catch (error) {
      return resolve({})
    }
  })
