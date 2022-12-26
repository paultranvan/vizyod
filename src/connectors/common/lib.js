const fs = require('fs')
const isEqual = require('lodash/isEqual')
const { Oauth } = require('../common/oauth')

/* This file includes the common lib methods, useful to run a connector */

/**
 * Get the access token for the given connector.
 * Read the token file and return the access token, or refresh it if needed.
 *
 * @param {string} connector - The connector name
 * @returns {string} The access token
 */
const getAccessToken = async (connector, tokenURL) => {
  let token
  const oauth = new Oauth(connector, tokenURL)
  token = oauth.readTokenFile(connector)

  if (oauth.isTokenExpired(token)) {
    console.log('Expired token. Refresh it...')
    token = await oauth.refreshAccessToken(token.refreshToken)
    oauth.writeTokenFile(token)
  }
  return token.accessToken
}

const readDataFile = (dataType) => {
  try {
    const path = `data/${dataType}.json`
    const content = fs.readFileSync(path)
    return JSON.parse(content)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("No file yet, let's create it.")
      return null
    }
    throw error
  }
}

const saveFile = (fileName, data) => {
  const path = `data/${fileName}`
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
  console.log(`${path} saved`)
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
  for (let i = toRemoveIdx.length - 1; i >= 0; i--) {
    // Go backward to avoid messing with array indexes
    newSeriesToKeep.splice(toRemoveIdx[i], 1)
  }
  return [...existingSeries, ...newSeriesToKeep]
}

const saveData = (dataType, existingData, newData) => {
  if (newData?.series?.length > 0) {
    if (existingData?.series?.length > 0) {
      const seriesToSave = seriesDeduplication(
        existingData.series,
        newData.series
      )
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

const handleError = (error) => {
  if (
    (error.code && error.code === 'ENOENT') ||
    (error.message && error.message.match(/Empty file/))
  ) {
    console.log('No token found: please run `npm run get-token`')
    return
  } else if (error.response) {
    console.error(error.response.data)
  }
  else {
    console.error(error)
  }
}

module.exports = {
  getAccessToken,
  readDataFile,
  saveData,
  handleError
}
