const express = require('express')
const { Oauth } = require('./oauth')

const app = express()

const PORT = 5000

let oauth
let appServer

app.get('/get_token', async (req, res) => {
  try {
    const code = req.query.code
    const data = await oauth.getAccessToken(code)
    oauth.writeTokenFile(data)
    res.send('Token received, you can close this window.')

    console.log('Token written, shutting down...')
    appServer.close()
  } catch (error) {
    console.error(error)
    res.send('An error occured')
  }
})

appServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  oauth = new Oauth()
  oauth.startTokenRequest()
})
