const fs = require('fs')
const api = require('./api')
const { Oauth } = require('./oauth')

const handleError = (error) => {
  if (
    (error.code && error.code === 'ENOENT') ||
    (error.message && error.message.match(/Empty file/))
  ) {
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
  try {
    await api.getSleepSummary(token.accessToken, new Date(), new Date())
  } catch (error) {
    if (error && error.status === 401) {
      console.log('Invalid token. Refresh it...')
      const oauth = new Oauth()
      token = await oauth.refreshAccessToken(token.refreshToken)
      oauth.writeTokenFile(token)
    }
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
    const data = await api.getSleepSummary(token, startDate, endDate)
    saveFile('sleep.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const getMeasureData = async (token) => {
  try {
    console.log('Get measure data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()

    const data = await api.getMeasure(token, startDate, endDate)
    saveFile('measure.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const getActivityData = async (token) => {
  try {
    console.log('Get activity data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()

    const data = await api.getActivity(token, startDate, endDate)
    saveFile('activity.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const getHighFrequencyData = async (token) => {
  try {
    console.log('Get heart data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const data = await api.getHighFrequencyActivity(token, startDate, endDate)

    saveFile('highfrequencyactivity.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const getWorkoutData = async (token) => {
  try {
    console.log('Get workout data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const data = await api.getWorkouts(token, startDate, endDate)

    saveFile('workout.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const getHeartData = async (token) => {
  try {
    console.log('Get heart data...')

    const startDate = new Date('2021-01-01')
    const endDate = new Date()
    const data = await api.getHeartList(token, startDate, endDate)

    saveFile('heart.json', data)
  } catch (error) {
    return handleError(error)
  }
}

const main = async () => {
  const token = await getAccessToken()

  getSleepData(token)
  getActivityData(token)
  getMeasureData(token)
  getWorkoutData(token)
  getHeartData(token)
  getHighFrequencyData(token)
}

main()
