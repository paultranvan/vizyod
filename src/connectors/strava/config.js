module.exports = {
  CONNECTOR_NAME: 'strava',
  AUTHORIZE_URL: 'http://www.strava.com/oauth/authorize',
  TOKEN_URL: 'https://www.strava.com/oauth/token',
  SCOPE: ['activity:read_all', 'profile:read_all'],
  DATA_TYPES: {
    ACTIVITY: 'running', // FIXME: there should be unified data type shared between conenctors with same data format 
  }
}