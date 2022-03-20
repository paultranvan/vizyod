const fs = require('fs')
const api = require('./api')
const { Oauth } = require('./oauth')

const handleError = (error) => {
  if ((error.code && error.code === 'ENOENT') || (error.message && error.message.match(/Empty file/))) {
    console.log('No token found: please run `npm run get-token`')
    return
  } else {
    console.error(error)
  }
}

const getAccessToken = async () => {
  let token = JSON.parse(fs.readFileSync('.token.json')) 
  if (!token || !token.accessToken) {
    throw new Error('Empty file')
  }
  const resp = await api.getSleepSummary(token.accessToken, new Date(), new Date())
  if (resp.status === 401) {
    console.log('Need to refresh token')
    oauth = new Oauth()
    token = await oauth.refreshAccessToken(token.refreshToken)
    oauth.writeTokenFile(token)
  }
  if (resp.status > 0) {
    throw 'Error while trying to get token'
  }
  return token.accessToken
}

const saveFile = (fileName, data) => {
  const path = `data/${fileName}`
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
  console.log(`${path} saved`)
}

const getSleepData = async (token) => {
  try {
    console.log('Get sleep data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()

    const resp = await api.getSleepSummary(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('sleep.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}

const getMeasureData = async (token) => {
  try {
    console.log('Get measure data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()

    const resp = await api.getMeasure(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('measure.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}

const getActivityData = async (token) => {
  try {
    console.log('Get activity data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()

    const resp = await api.getActivity(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('activity.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}

const getHighFrequencyData = async (token) => {
  try {
    console.log('Get heart data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const resp = await api.getHighFrequencyActivity(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('highactivity.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}

const getWorkoutData = async (token) => {
  try {
    console.log('Get workout data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const resp = await api.getWorkouts(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('workout.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}


const getHeartData = async (token) => {
  try {
    console.log('Get heart data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const resp = await api.getHeartList(token, startDate, endDate)

    if (resp.status > 0) {
      // See https://developer.withings.com/api-reference/#section/Response-status 
      return console.error(resp)
    }
    saveFile('heart.json', resp.body)
  }
  catch (error) {
    return handleError(error)
  }
}

const main = async () => {
  const token = await getAccessToken()
  getSleepData(token)
  getMeasureData(token)
  getActivityData(token)
  getHighFrequencyData(token)
  getWorkoutData(token)
  getHeartData(token)
}
main()

