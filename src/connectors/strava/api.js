const axios = require('axios').default
const { convertTimestampInISO, sortByDate, convertDateInTimestamp } = require('../common/utils')


const makePaginatedRequest = async (
  verb,
  { url, params, token }
) => {
  const results = []

    let hasMore = true
    const MAX_PER_PAGE = 200 // Max number allowed by strava api
    let page = 1

    while (hasMore) {
      const resp = await axios.get(
        url, {
          params: {...params, per_page: MAX_PER_PAGE, page: page }, 
          headers: { Authorization: `Bearer ${token}` }
        }
      ).catch((err) => {
        throw new Error(JSON.stringify(err.response.data))
      })
      if (!resp.data || resp.data.length < 1) {
        hasMore = false
        continue
      }
      for (const activity of resp.data) {
        const date = new Date(activity.start_date)
        results.push({ date, ...activity })
      }
      page++
    }
    return results
}

const getActivityList = async (token, startDate, endDate) => {
  const url = 'https://www.strava.com/api/v3/athlete/activities'
  const params = {
    action: 'getsummary',
    before: convertDateInTimestamp(endDate),
    after: convertDateInTimestamp(startDate)
  }
  
  const results = await makePaginatedRequest('GET', {
    url,
    params,
    token,
    resDataKey: 'series'
  })
  const series = results.map((res) => {
    return {
      date: res.date,
      startDate: res.start_date,
      endDate: convertTimestampInISO(
        new Date(res.start_date).getTime() + res.elapsed_time * 1000
      ),
      measure: { ...res }
    }
  })
  return { series: sortByDate(series) }
}

module.exports = {
  getActivityList
}