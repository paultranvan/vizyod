const fs = require('fs')
const api = require('./api')
const { Oauth } = require('./oauth')

const getSleepData = async () => {
  try {
    const token = JSON.parse(fs.readFileSync('.token.json')) 
    if (!token || !token.accessToken) {
      throw new Error('Empty file')
    } 
    const accessToken = token.accessToken
    let resp = await api.getSleepSummary(accessToken, '2021-01-01', '2022-03-07')

    if (resp.status === 401) {
      oauth = new Oauth()
      const data = await oauth.refreshAccessToken(token.refreshToken)
      oauth.writeTokenFile(data)
      resp = await api.getSleepSummary(data.accessToken, '2021-02-01', '2022-03-07')
    }

    fs.writeFileSync('data/sleep.json', JSON.stringify(resp.body, null, 2))
    console.log('File saved')

  }
  catch (error) {
    if (error.code === 'ENOENT' || error.message.match(/Empty file/)) {
      console.log('No token found: please run `npm run get-token`')
      return
    } else {
      console.error(error)
    }
  }


}

getSleepData()