const open = require('open')
const fs = require('fs')
const axios = require('axios').default
const consts = require('./consts')

class Oauth {
    constructor() {
        const config = this.getClientConfig()
        if (!config) {
            return
        }
        this.client_id = config.client_id
        this.client_secret = config.client_secret
    }

    getClientConfig() {
        try {
            const configPath = `${process.cwd()}/src/connectors/config.json`
            const configData = JSON.parse(fs.readFileSync(configPath))
            const withingsConfig = configData[consts.CONNECTOR_NAME] 
            return withingsConfig
        } catch (error) {
            throw(error)
        }
    }

    buildURL() {
        const baseUrl = 'https://account.withings.com/oauth2_user/authorize2'
    
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: this.client_id,
            state: 'vizevy',
            scope: ['user.activity', 'user.metrics'],
            redirect_uri: consts.REDIRECT_URI
        })
        return `${baseUrl}?${params}`
    }

    async getAccessToken(code) {
        const url = 'https://wbsapi.withings.net/v2/oauth2'
        const resp = await axios.post(url, {
            action: 'requesttoken',
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: consts.REDIRECT_URI
        })
        return {
            accessToken: resp.data.body.access_token,
            refreshToken: resp.data.body.refresh_token,
            expiresIn: resp.data.body.expires_in
        }
    }

    startTokenRequest() {
        const url = this.buildURL()
        open(url)
    }
}



module.exports = {
    Oauth
}

