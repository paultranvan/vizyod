const axios = require('axios').default

// TODO: pagination

const convertDateInTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
}

const convertDateInYMD = (date) => {
    return date.toISOString().split('T')[0]
}


const getSleepSummary = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/sleep'
    const params = {
        action: 'getsummary',
        startdateymd: convertDateInYMD(startDate),
        enddateymd: convertDateInYMD(endDate),
    }
    const resp = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` }
    })
    return resp.data
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
    const resp = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` }
    })
    return resp.data
}

const getActivity = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getactivity',
        startdateymd: convertDateInYMD(startDate),
        enddateymd: convertDateInYMD(endDate),
        data_fields: 'steps,distance,elevation,calories,hr_average' 
    }
    const resp = await axios.post(url, params, {
        headers: { Authorization: `Bearer ${token}`}
    })
    return resp.data
}

const getHighFrequencyActivity = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getintradayactivity',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate),
        data_fields: 'steps,distance,calories,heart_rate' 
    }
    const resp = await axios.post(url, params, {
        headers: { Authorization: `Bearer ${token}`}
    })
    return resp.data
}

const getWorkouts = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/measure'
    const params = {
        action: 'getworkouts',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate),
        data_fields: 'steps,distance,calories,hr_average' 
    }
    const resp = await axios.post(url, params, {
        headers: { Authorization: `Bearer ${token}`}
    })
    return resp.data
}


const getHeartList = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/heart'
    const params = {
        action: 'list',
        startdate: convertDateInTimestamp(startDate),
        enddate: convertDateInTimestamp(endDate)
    }
    const resp = await axios.post(url, params, {
        headers: { Authorization: `Bearer ${token}`}
    })
    return resp.data
}

module.exports = {
    getSleepSummary,
    getMeasure,
    getActivity,
    getHighFrequencyActivity,
    getWorkouts,
    getHeartList
}