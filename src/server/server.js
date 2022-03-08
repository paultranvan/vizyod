
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
      const startDate = req.query.startDate
      const endDate = req.query.endDate
      console.log(`received request for ${dataType} from ${startDate} to ${endDate}`)

      const dataPath = `data/${dataType}.json`
      const data = JSON.parse(fs.readFileSync(dataPath))
      const series = data.series

      const filteredSeries = series.filter(serie => serie.date >= startDate && serie.date <= endDate)
      res.send(filteredSeries)

    } catch (error) {
        console.error(error)
        res.send(error)
    }
})



