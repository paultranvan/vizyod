const roundNumber = (number) => {
  return Math.round(number * 100) / 100
}

const convertDateInTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000)
}

const convertDateInYMD = (date) => {
  return date.toISOString().split('T')[0]
}

const convertTimestampInISO = (timestamp) => {
  return new Date(timestamp).toISOString()
}

const sortByDate = (series) => {
  return series.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date)
  })
}

const tokenFileName = (connector) => {
  return `.token-${connector}.json`
}

const getStartDateFromSeries = (data) => {
  return data?.series?.length > 0
    ? new Date(data.series[data.series.length - 1].date)
    : new Date(0)
}

module.exports = {
  roundNumber,
  convertDateInTimestamp,
  convertDateInYMD,
  convertTimestampInISO,
  sortByDate,
  tokenFileName,
  getStartDateFromSeries
}