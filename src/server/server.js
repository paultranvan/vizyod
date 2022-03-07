
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


app.get('/data', (req, res) => {
    try {
      console.log('received request')
      const sleepFile = JSON.parse(fs.readFileSync('./sleep.json'))
      const series = sleepFile.body.series
      res.send(series)

    } catch (error) {
        console.error(error)
        res.send(error)
    }
})



