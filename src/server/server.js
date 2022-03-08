
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()

const PORT = 8080

let client

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
app.use(cors({origin: '*'}));

app.get('/data/:type', (req, res) => {
    try {
      const dataType = req.params.type
      console.log('received request for ', dataType)

      const dataPath = `data/${dataType}.json`
      const data = JSON.parse(fs.readFileSync(dataPath))
      const series = data.series
      res.send(series)

    } catch (error) {
        console.error(error)
        res.send(error)
    }
})



