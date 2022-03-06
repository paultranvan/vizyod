const axios = require('axios').default
const open = require('open')

const CLIENT_ID = '478da26c51f7421ec2f4213a61e574fceaa1ddef86fe02fe5d0fa49780c8e021'
const CLIENT_SECRET = 'c1c56f34d7cbda569371dca3ce745f20e87bf1a4fd448413c9b172cb9d4586b0'
const REDIRECT_URI = 'http://localhost:5000/get_token'

const buildURL = () => {
    const baseUrl = 'https://account.withings.com/oauth2_user/authorize2'
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        state: 'vizevy',
        scope: ['user.activity', 'user.metrics'],
        redirect_uri: REDIRECT_URI
    })
    const url = `${baseUrl}?${params}`
    console.log(url);
    return url
}

const getAccessToken = async (code) => {
    const url = 'https://wbsapi.withings.net/v2/oauth2'
    const resp = await axios.post(url, {
        action: 'requesttoken',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
    })
    return {
        accessToken: resp.data.body.access_token,
        refreshToken: resp.data.body.refresh_token,
        expiresIn: resp.data.body.expires_in
    }
}

const main = async () => {
    const url = await buildURL()
    open(url)
}
main()

module.exports = {
    getAccessToken
}
