const axios = require('axios').default
const get = require('lodash/get')

const convertDateInTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
}

const convertDateInYMD = (date) => {
    return date.toISOString().split('T')[0]
}

const makePaginatedRequest = async (verb, { url, params, token, resDataKey }) => {
    let hasMore = true
    let offset = 0
    const results = []
    while (hasMore) {
        let resp
        if (verb === 'GET') {
            resp = await axios.get(url, {
                params: {...params, offset},
                headers: { Authorization: `Bearer ${token}` }
            })
        }
        else {
            resp = await axios.post(url, {...params, offset}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        }
        if (resp.data.status > 0) {
            // See https://developer.withings.com/api-reference/#section/Response-status 
            throw resp.data
        }
        console.log('get data on:', resDataKey)
        const respData = get(resp, `data.body.${resDataKey}`)
        if (respData && respData.length > 0) {
            results.push(...respData)
        }
        if (!resp.data.body.more) {
            hasMore = false
        } else {
            offset = resp.data.body.offset
        }
    }
    return results
}


const getSleepSummary = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/sleep'
    const params = {
        action: 'getsummary',
        startdateymd: convertDateInYMD(startDate),
        enddateymd: convertDateInYMD(endDate),
    }
    const results = await makePaginatedRequest('GET', {url, params, token, resDataKey: 'series' })
    return { series: results }
}

const getMeasure = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/measure'

    const params = {
        action: 'getmeas',
        meastypes: '1,4,6,8,11,76,77,88', // TODO: use const with measure name
        category: 1,
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate)
    }
    const results = await makePaginatedRequest('GET', {url, params, token, resDataKey: 'measuregrps' })
    return { series: results }
}

const getActivity = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getactivity',
        startdateymd: convertDateInYMD(startDate),
        enddateymd: convertDateInYMD(endDate),
        data_fields: 'steps,distance,elevation,calories,hr_average' 
    }
    const results = await makePaginatedRequest('POST', {url, params, token, resDataKey: 'activities' })

    return { series: results }
}

const getHighFrequencyActivity = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getintradayactivity',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate),
        data_fields: 'steps,distance,calories,heart_rate' 
    }
    const results = await makePaginatedRequest('POST', {url, params, token, resDataKey: 'series' })
    return { series: results }
}

const getWorkouts = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getworkouts',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate),
        data_fields: 'steps,distance,calories,hr_average' 
    }

    const results = await makePaginatedRequest('POST', {url, params, token, resDataKey: 'series' })
    return { series: results }
}


const getHeartList = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/heart'
    const params = {
        action: 'list',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate)
    }
    const results = await makePaginatedRequest('POST', {url, params, token, resDataKey: 'series' })
    return { series: results }
}

module.exports = {
    getSleepSummary,
    getMeasure,
    getActivity,
    getHighFrequencyActivity,
    getWorkouts,
    getHeartList
}