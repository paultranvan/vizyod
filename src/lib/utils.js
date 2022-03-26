export const computeAverage = (values) => {
  return values.reduce((a,b) => a + b, 0) / values.length;
}

export const roundNumber = (number) => {
  return Math.round(number * 100) / 100
}

export const convertDateSingleDay = (date) => {
  return new Date(date).toISOString().split('T')[0]
}