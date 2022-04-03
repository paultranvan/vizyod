export const computeAverage = (values) => {
  return values.reduce((a, b) => a + b, 0) / values.length
}

export const roundNumber = (number, { decimals = 2 } = {}) => {
  const mult = Math.pow(10, decimals)
  return Math.round(number * mult) / mult
}

export const convertDateSingleDay = (date) => {
  return new Date(date).toISOString().split('T')[0]
}
