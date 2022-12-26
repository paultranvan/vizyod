module.exports = {
  CONNECTOR_NAME: 'withings',
  AUTHORIZE_URL: 'https://account.withings.com/oauth2_user/authorize2',
  TOKEN_URL: 'https://wbsapi.withings.net/v2/oauth2',
  SCOPE: ['user.activity', 'user.metrics'],
  STATE: 'vizyod',
  DATA_TYPES: {
    SLEEP: 'sleep',
    DAILY_MEASURE: 'dailymeasure',
    WEIGHT: 'weight',
    WORKOUT: 'workout',
    HIGH_FREQUENCY_ACTIVITY: 'highfrequencyactivity',
    HEART: 'heart'
  }
}
