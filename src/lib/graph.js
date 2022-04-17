import { sum, unzip } from 'lodash'
import { roundNumber } from './utils'
import { GRAPH_TYPES } from './consts'

export const makeGraphFromSeries = (graphType, series) => {
  if (graphType === GRAPH_TYPES.STACKED_BAR) {
    return makeStackedBarGraph(series)
  } else if (graphType === GRAPH_TYPES.BAR_AND_LINES) {
    return makeBarAndLinesGraph(series)
  } else if (graphType === GRAPH_TYPES.STACKED_LINES) {
    return makeStackedLinesGraph(series)
  }
  return makeLinesGraph(series)
}

const makeBaseGraph = (serie, type, options = {}) => {
  const { yAxisIndex = 0, withAverage = true, ...rest } = options
  const baseGraph = {
    data: serie.data,
    type,
    name: serie.name,
    itemStyle: {
      color: serie.color || 'black'
    },
    yAxisIndex
  }
  if (withAverage) {
    baseGraph.markLine = {
      data: [{ type: 'average', name: 'Avg' }],
      label: `Average ${serie.name}`
    }
  }
  return Object.assign(baseGraph, rest)
}

const makeStackedBarGraph = (series, { withTotalAverage = true } = {}) => {
  const graphSeries = series.map((serie) => makeStackedBarGraphSerie(serie))
  if (withTotalAverage) {
    const seriesData = series.map((serie) => serie.data)
    const sumSeries = unzip(seriesData).map((values) =>
      roundNumber(sum(values))
    )
    const totalLine = { data: sumSeries, name: 'Total' }
    const lineGraph = makeLinesGraph([totalLine])
    graphSeries.push(lineGraph[0])
  }
  return graphSeries
}

const makeLinesGraph = (series, { yAxisIndex = 0 } = {}) => {
  return series.map((serie) => makeBaseGraph(serie, 'line', { yAxisIndex }))
}

const makeStackedBarGraphSerie = (serie) => {
  return makeBaseGraph(serie, 'bar', { stack: 'x' })
}

const makeBarAndLinesGraph = (series) => {
  return series.map((serie, i) => {
    if (i === 0) {
      return makeBaseGraph(serie, 'bar')
    } else {
      return makeBaseGraph(serie, 'line', { yAxisIndex: 1 })
    }
  })
}

const makeStackedLinesGraph = (series) => {
  return series.map((serie, i) => {
    const options = {
      areaStyle: {},
      stack: 'Total',
      emphasis: {
        focus: 'series'
      }
    }
    return i < series.length - 1
      ? makeBaseGraph(serie, 'line', {
          withAverage: false,
          ...options
        })
      : makeBaseGraph(serie, 'line', {
          withAverage: true,
          ...options
        })
  })
}

export const buildYAxis = (model) => {
  const baseAxis = {
    type: 'value'
  }
  if (model.graphType === GRAPH_TYPES.BAR_AND_LINES) {
    return [
      { ...baseAxis, name: model.dataSeries[0].unit },
      { ...baseAxis, name: model.dataSeries[1].unit }
    ]
  } else {
    return [{ ...baseAxis, name: model.unit }]
  }
}
