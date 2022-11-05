module.exports = {
  CONNECTOR_NAME: 'withings',
  REDIRECT_URI: 'http://localhost:5000/get_token',
  TOKEN_FILE_PATH: '.token.json',
  DATA_TYPES: {
    SLEEP: 'sleep',
    ACTIVITY: 'activity',
    MEASURE: 'measure',
    WORKOUT: 'workout',
    HIGH_FREQUENCY_ACTIVITY: 'highfrequencyactivity',
    HEART: 'heart'
  }
}