const fs = require('fs')
const isEqual = require('lodash/isEqual')
const api = require('./api')
const { DATA_TYPES } = require('./consts')
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

const readDataFile = (dataType) => {
  try {
    const path = `data/${dataType}.json`
    const content = fs.readFileSync(path)
    return JSON.parse(content)  
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No file yet, let\'s create it.')
      return null
    }
    throw error
  }
}

const seriesDeduplication = (existingSeries, newSeries) => {
  const toRemoveIdx = []
  const newSeriesToKeep = [...newSeries]
  for (let i = 0; i < newSeries.length; i++) {
    for (let j = existingSeries.length - 1; j >= 0; j--) {
      if (isEqual(newSeries[i], existingSeries[j])) {
        toRemoveIdx.push(i)
        break
      }
      if (new Date(newSeries[i].date) > new Date(existingSeries[j].date)) {
        // Assume all data are correclty sorted by asc date 
        break
      }
    }    
  } 
  for (let i = toRemoveIdx.length -1 ; i >= 0; i--) {
    // Go backward to avoid messing with array indexes
    newSeriesToKeep.splice(toRemoveIdx[i], 1)
  }
  return [...existingSeries, ...newSeriesToKeep]
}

const saveData = (dataType, existingData, newData) => {
  if (newData?.series?.length > 0) {
    if (existingData?.series?.length > 0) {
      const seriesToSave = seriesDeduplication(existingData.series, newData.series)
      const nSavedSeries = seriesToSave.length - existingData.series.length
      existingData.series = seriesToSave
      saveFile(`${dataType}.json`, existingData)
      console.log(`Saved ${nSavedSeries} new ${dataType} series`)
  } else {
      saveFile(`${dataType}.json`, newData)
      console.log(`Saved ${newData.series.length} ${dataType} series`)
    }
  } else {
    console.log('No data retrieved')
  }
}

const getStartDate = (existingData) => {
  return existingData?.series?.length > 0
     ? new Date(existingData.series[existingData.series.length - 1].date)
     : new Date(0)
}

const getSleepData = async (token) => {
  try {
    console.log('Get sleep data...')

    const sleepData = readDataFile(DATA_TYPES.SLEEP)
    const startDate = getStartDate(sleepData)
    const endDate = new Date()

    const newSleepData = await api.getSleepSummary(token, startDate, endDate)
    saveData(DATA_TYPES.SLEEP, sleepData, newSleepData)
  } catch (error) {
    return handleError(error)
  }
}

const getMeasureData = async (token) => {
  try {
    console.log('Get measure data...')

    const measuresData = readDataFile(DATA_TYPES.MEASURE)
    const startDate = getStartDate(measuresData)
    const endDate = new Date()

    const newData = await api.getMeasure(token, startDate, endDate)
    saveData(DATA_TYPES.MEASURE, measuresData, newData)

  } catch (error) {
    return handleError(error)
  }
}

const getActivityData = async (token) => {
  try {
    console.log('Get activity data...')

    const activityData = readDataFile(DATA_TYPES.ACTIVITY)
    const startDate = getStartDate(activityData)
    const endDate = new Date()

    const newData = await api.getActivity(token, startDate, endDate)
    saveData(DATA_TYPES.ACTIVITY, activityData, newData)

  } catch (error) {
    return handleError(error)
  }
}

const getHighFrequencyData = async (token) => {
  try {
    console.log('Get high frequency data...')

    const highFrequencyData = readDataFile(DATA_TYPES.HIGH_FREQUENCY_ACTIVITY)
    const startDate = getStartDate(highFrequencyData)
    const endDate = new Date()

    const newData = await api.getHighFrequencyActivity(token, startDate, endDate)
    saveData(DATA_TYPES.HIGH_FREQUENCY_ACTIVITY, highFrequencyData, newData)
  } catch (error) {
    return handleError(error)
  }
}

const getWorkoutData = async (token) => {
  try {
    console.log('Get workout data...')

    const workoutData = readDataFile(DATA_TYPES.WORKOUT)
    const startDate = getStartDate(workoutData)
    const endDate = new Date()

    const newData = await api.getWorkouts(token, startDate, endDate)
    saveData(DATA_TYPES.WORKOUT, workoutData, newData)
  } catch (error) {
    return handleError(error)
  }
}

const getHeartData = async (token) => {
  try {
    console.log('Get heart data...')

    const heartData = readDataFile(DATA_TYPES.HEART)
    const startDate = getStartDate(heartData)
    const endDate = new Date()

    const newData = await api.getHeartList(token, startDate, endDate)
    saveData(DATA_TYPES.HEART, heartData, newData)
  } catch (error) {
    return handleError(error)
  }
}

//TODO: fails when called from sync and token invalid
const getAllData = async () => {
  const token = await getAccessToken()

  await getSleepData(token)
  await getActivityData(token)
  await getMeasureData(token)
  await getWorkoutData(token)
  await getHeartData(token)
  await getHighFrequencyData(token)
}

if (require.main === module) {
  getAllData()
} 

module.exports = { getAllData }