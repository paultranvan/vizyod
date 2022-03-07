const axios = require('axios').default

 //axios.defaults.headers.common['Authorization'] = `Bearer 0d46f638f0632909fa4a9b27660f4209b23558a0`;

const getSleepSummary = async (token, startDate, endDate) => {
    const url = 'https://wbsapi.withings.net/v2/sleep'
    const params = {
        action: 'getsummary',
        startdateymd: startDate,
        enddateymd: endDate,
    }
    const resp = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` }
    })
    return resp.data
}


module.exports = {
    getSleepSummary
}