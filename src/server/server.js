
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
app.use(cors({origin: '*'}));

app.get('/data/:type', (req, res) => {
    try {
      const dataType = req.params.type
      const startDate = new Date(req.query.startDate)
      const endDate = new Date(req.query.endDate)
      console.log(`received request for ${dataType} from ${startDate} to ${endDate}`)

      const dataPath = `data/${dataType}.json`
      const data = JSON.parse(fs.readFileSync(dataPath))

      const filteredData = data.series.filter(serie => {
        const dateSerie = typeof serie.date === 'number' ? new Date(serie.date * 1000) : new Date(serie.date)
        return dateSerie >= startDate && dateSerie <= endDate
      })
      res.send(filteredData)

    } catch (error) {
        console.error(error)
        res.send(error)
    }
})



