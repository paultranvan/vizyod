const express = require('express')
const fs = require('fs')
const cors = require('cors')
const { getAllData: getAllDataWithings } = require('../connectors/withings')
const { getAllData: getAllDataStrava } = require('../connectors/strava')

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
app.use(cors({ origin: '*' }))

app.get('/data/:type', (req, res) => {
  try {
    const dataType = req.params.type
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()

    console.log(
      `received request for ${dataType} from ${startDate.toISOString()} to ${endDate.toISOString()}`
    )

    const dataPath = `data/${dataType}.json`
    const data = JSON.parse(fs.readFileSync(dataPath))

    const filteredData = data.series.filter((serie) => {
      const dateSerie =
        typeof serie.date === 'number'
          ? new Date(serie.date * 1000)
          : new Date(serie.date)
      return dateSerie >= startDate && dateSerie <= endDate
    })
    res.send(filteredData)
  } catch (error) {
    if (
      (error.code && error.code === 'ENOENT') ||
      (error.message && error.message.match(/Empty file/))
    ) {
      console.log('No file found for ', req.params.type)
      console.log('Please run the connector first')
      res.send([])
    } else {
      console.error(error)
    }
    res.send(error)
  }
})

app.post('/sync', async (req, res) => {
  try {
    console.log('Sync data...')
    await Promise.all([getAllDataWithings, getAllDataStrava])
    res.send('done')
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})
