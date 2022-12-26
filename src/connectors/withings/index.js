const api = require('./api')
const { DATA_TYPES, CONNECTOR_NAME, TOKEN_URL } = require('./config')
const {
  getAccessToken,
  readDataFile,
  saveData,
  handleError
} = require('../common/lib')
const { getStartDateFromSeries } = require('../common/utils')

const getSleepData = async (token) => {
  try {
    console.log('Get sleep data...')

    const sleepData = readDataFile(DATA_TYPES.SLEEP)
    const startDate = getStartDateFromSeries(sleepData)
    const endDate = new Date()

    const newSleepData = await api.getSleepSummary(token, startDate, endDate)
    saveData(DATA_TYPES.SLEEP, sleepData, newSleepData)
  } catch (error) {
    return handleError(error)
  }
}

const getWeightData = async (token) => {
  try {
    console.log('Get weight data...')

    const weightData = readDataFile(DATA_TYPES.WEIGHT)
    const startDate = getStartDateFromSeries(weightData)
    const endDate = new Date()

    const newData = await api.getWeight(token, startDate, endDate)
    saveData(DATA_TYPES.WEIGHT, weightData, newData)
  } catch (error) {
    return handleError(error)
  }
}

const getActivityData = async (token) => {
  try {
    console.log('Get activity data...')

    const activityData = readDataFile(DATA_TYPES.ACTIVITY)
    const startDate = getStartDateFromSeries(activityData)
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
    const startDate = getStartDateFromSeries(highFrequencyData)
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
    const startDate = getStartDateFromSeries(workoutData)
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
    const startDate = getStartDateFromSeries(heartData)
    const endDate = new Date()

    const newData = await api.getHeartList(token, startDate, endDate)
    saveData(DATA_TYPES.HEART, heartData, newData)
  } catch (error) {
    return handleError(error)
  }
}

const getAllData = async () => {
  try {
    const token = await getAccessToken(CONNECTOR_NAME, TOKEN_URL)

    await getSleepData(token)
    await getActivityData(token)
    await getWeightData(token)
    await getWorkoutData(token)
    await getHeartData(token)
    // await getHighFrequencyData(token)
  } catch (err) {
    handleError(err)
  }
}

if (require.main === module) {
  getAllData()
} 

module.exports = { getAllData }