const api = require('./api')
const { CONNECTOR_NAME, TOKEN_URL, DATA_TYPES } = require('./config')
const { getAccessToken, readDataFile, saveData, handleError } = require('../common/lib')
const { getStartDateFromSeries } = require('../common/utils')

const getActivityData = async (token) => {
  console.log('Get activity data...')

  const activityData = readDataFile(DATA_TYPES.ACTIVITY)
  const startDate = getStartDateFromSeries(activityData)
  const endDate = new Date()
  const newActivityData = await api.getActivityList(token, startDate, endDate)
  saveData(DATA_TYPES.ACTIVITY, activityData, newActivityData)
}

const getAllData = async () => {
  try {
    const token = await getAccessToken(CONNECTOR_NAME, TOKEN_URL)
    await getActivityData(token)
  } catch (err) {
    handleError(err)
  }
}

if (require.main === module) {
  getAllData()
} 

module.exports = { getAllData } 
