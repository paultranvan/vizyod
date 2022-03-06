
const express = require('express')
const oauth = require('./oauth')
const fs = require('fs')

const app = express()

const PORT = 5000

let client

app.get('/get_token', async (req, res) => {
    try {
        const code = req.query.code
        const data = await client.getAccessToken(code)
        fs.writeFileSync('.token.json', JSON.stringify(data), null, 2)
        
        console.log('Token stored in .token.json ')
        res.send('Token received, you can close this window.')
    } catch (error) {
        console.error(error)
        res.send('An error occured')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)

    client = new oauth.Oauth()
    client.startTokenRequest()
})

