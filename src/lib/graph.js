import { sum, unzip } from 'lodash'
import { roundNumber } from './utils'
import { GRAPH_TYPES } from './consts'

const makeStackedBarGraphSerie = (serie, { withAverage = true } = {}) => {
  return {
    data: serie.data,
    type: 'bar',
    name: serie.name,
    stack: 'x',
    itemStyle: {
      color: serie.color
    }
  }
}

const makeLineGraphSerie = (serie) => {
  return {
    data: serie.data,
    type: 'line',
    name: serie.name,
    itemStyle: {
      color: 'black'
    },
    markLine: {
      data: [{ type: 'average', name: 'Avg' }],
      label: `Average ${serie.name}`
    }
  }
}

export const makeGraphFromSeries = (graphType, series) => {
  if (graphType === GRAPH_TYPES.STACKED_BAR) {
    return makeStackedBarGraph(series)
  } else {
    return makeBarAndLinesGraph(series)
  }
}

export const makeStackedBarGraph = (
  series,
  { withTotalAverage = true } = {}
) => {
  const graphSeries = series.map((serie) => makeStackedBarGraphSerie(serie))
  if (withTotalAverage) {
    const seriesData = series.map((serie) => serie.data)
    const sumSeries = unzip(seriesData).map((values) =>
      roundNumber(sum(values))
    )
    graphSeries.push(makeLineGraphSerie({ data: sumSeries, name: 'Total' }))
  }
  return graphSeries
}

export const makeBarAndLinesGraph = (series) => {
  return series.map((serie, i) => {
    if (i === 0) {
      return {
        data: serie.data,
        type: 'bar',
        name: serie.name,
        itemStyle: {
          color: serie.color
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
          label: `Average ${serie.name}`
        }
      }
    } else {
      return {
        data: serie.data,
        type: 'line',

const makeStackedLinesGraph = (series, { withTotalAverage = true } = {}) => {
  return series.map((serie, i) => {
    const lineGraph = {
      data: serie.data,
      type: 'line',
      stack: 'Total',
      name: serie.name,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: serie.color
      }
    }
    if (i === series.length - 1 && withTotalAverage) {
      lineGraph.markLine = {
        data: [{ type: 'average', name: 'Avg' }],
        color: 'black'
      }
    }
    return lineGraph
  })
}
