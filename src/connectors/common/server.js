const express = require('express')
const { Oauth } = require('./oauth')

const app = express()

const PORT = 5000

let oauth
let appServer
let config

if (process.argv.length < 3) {
  console.log(`Please pass the connector name. Abort.`)
  process.exit(0)
}

const connector = process.argv[2]

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
  config = require(`../${connector}/config`)
  oauth = new Oauth(connector, config.TOKEN_URL)
  if (config.STATE) {
    // Required for withings
    oauth.setState(config.STATE)
  }
  oauth.startTokenRequest(config.AUTHORIZE_URL, config.SCOPE)
})
