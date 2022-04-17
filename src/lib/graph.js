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
      return makeBaseGraph(serie, 'bar', { withAverage: false })
    } else {
      return makeBaseGraph(serie, 'line', { yAxisIndex: 1, withAverage: false })
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
  const units = model.unit
    ? [model.unit]
    : model.dataSeries.map((serie) => serie.unit)

  // Display 1 or 2 Y axis depending on units
  if (units.length === 1) {
    return [{ ...baseAxis, name: units[0] }]
  }
  if (units.length === 2) {
    return [
      { ...baseAxis, name: units[0] },
      { ...baseAxis, name: units[1] }
    ]
  }
  // No unit given, or too many
  return null
}
