
const express = require('express')
const oauth = require('./oauth')
const fs = require('fs')

const app = express()

const PORT = 5000

app.get('/get_token', async (req, res) => {
    const code = req.query.code

    const data = await oauth.getAccessToken(code)
    fs.writeFileSync('.token.json', JSON.stringify(data))
    
    console.log('Token stored in .token.json ')
    res.send('Token received, you can close this window.')

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

