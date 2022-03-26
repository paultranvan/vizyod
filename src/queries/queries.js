import axios from 'axios'

const SERVER_URL = 'http://localhost:8080'

export const getSeries = async (type, {startDate, endDate} = {}) => {
  const result = await axios(
    `${SERVER_URL}/data/${type}`,
    {
      params:
      {
        startDate,
        endDate
      }
    }
  )
  return result.data
}
