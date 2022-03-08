const fs = require('fs')
const api = require('./api')

const getSleepData = async () => {
  try {
    const tokenFile = JSON.parse(fs.readFileSync('.token.json'))  
    const token = tokenFile.accessToken
    const sleepSummary = await api.getSleepSummary(token, '2022-02-01', '2022-03-07')
    fs.writeFileSync('data/sleep.json', JSON.stringify(resp.body, null, 2))
    console.log('File saved')

    fs.writeFileSync('sleep.json', JSON.stringify(sleepSummary, null, 2))
    console.log('file written')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No token found: please run `npm run get-token`')
      return
    } else {
      console.error(error)
    }
  }
}

getSleepData()