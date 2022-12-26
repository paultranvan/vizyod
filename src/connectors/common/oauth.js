const open = require('open')
const fs = require('fs')
const axios = require('axios').default
const { tokenFileName } = require('./utils')

const REDIRECT_URI = 'http://localhost:5000/get_token'

class Oauth {
  constructor(connector, tokenURL) {
    const config = this.getClientConfig(connector)
    if (!config) {
      return
    }
    this.client_id = config.client_id
    this.client_secret = config.client_secret
    this.connector = connector
    this.tokenURL = tokenURL
  }

  setState(state) {
    this.state = state
  }

  getClientConfig(connector) {
    try {
      const configPath = `${process.cwd()}/src/connectors/config.json`
      const configData = JSON.parse(fs.readFileSync(configPath))
      const connectorConfig = configData[connector]
      return connectorConfig
    } catch (error) {
      throw error
    }
  }

  buildAuthorizeURL(authorizeUrl, scope) {
    const urlParams = {
      response_type: 'code',
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope,
      redirect_uri: REDIRECT_URI
    }
    if (this.state) {
      urlParams.state = this.state
    }
    const params = new URLSearchParams(urlParams)

    return `${authorizeUrl}?${params}`
  }

  async getAccessToken(code) {
    const params = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }
    if (this.connector === 'withings') {
      // Special case
      params.action = 'requesttoken'
    }
    const resp = await axios.post(this.tokenURL, params)

    if (this.connector === 'withings') {
      // Withings format
      return {
        accessToken: resp.data.body.access_token,
        refreshToken: resp.data.body.refresh_token,
        expiresIn: resp.data.body.expires_in,
        expiresAt: Math.floor(
          new Date().getTime() / 1000 + resp.data.body.expires_in
        )
      }
    }
    return {
      accessToken: resp.data?.access_token,
      refreshToken: resp.data.refresh_token,
      expiresIn: resp.data.expires_in,
      expiresAt: resp.data.expires_at
    }
  }

  async refreshAccessToken(refreshToken) {
    const params = {
      action: 'requesttoken',
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
    if (this.connector === 'withings') {
      // Special case
      params.action = 'requesttoken'
    }
    console.log({ params })

    const resp = await axios.post(this.tokenURL, params)
    if (this.connector === 'withings') {
      // Withings format
      return {
        accessToken: resp.data.body.access_token,
        refreshToken: resp.data.body.refresh_token,
        expiresIn: resp.data.body.expires_in,
        expiresAt: Math.floor(
          new Date().getTime() / 1000 + resp.data.body.expires_in
        )
      }
    }
    return {
      accessToken: resp.data.access_token,
      refreshToken: resp.data.refresh_token,
      expiresIn: resp.data.expires_in,
      expiresAt: resp.data.expires_at
    }
  }

  writeTokenFile(data) {
    return fs.writeFileSync(
      tokenFileName(this.connector),
      JSON.stringify(data, null, 2)
    )
  }

  readTokenFile() {
    const token = JSON.parse(fs.readFileSync(tokenFileName(this.connector)))
    if (!token || !token.accessToken) {
      throw new Error('Empty file')
    }
    return token
  }

  isTokenExpired(token) {
    return new Date(token.expiresAt * 1000) <= new Date()
  }

  startTokenRequest(authorizeUrl, scope) {
    const url = this.buildAuthorizeURL(authorizeUrl, scope)
    open(url)
  }
}

module.exports = {
  Oauth
}
