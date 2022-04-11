import { sum, unzip } from 'lodash'
import { roundNumber } from './utils'
import { GRAPH_TYPES } from './consts'

// TODO refactor

export const makeGraphFromSeries = (graphType, series, options) => {
  if (graphType === GRAPH_TYPES.STACKED_BAR) {
    return makeStackedBarGraph(series)
  } else if (graphType === GRAPH_TYPES.BAR_AND_LINES) {
    return makeBarAndLinesGraph(series)
  } else if (graphType === GRAPH_TYPES.STACKED_LINES) {
    return makeStackedLinesGraph(series)
  }
  return makeLinesGraph(series)
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
  return series.map((serie) => {
    return {
      data: serie.data,
      type: 'line',
      name: serie.name,
      itemStyle: {
        color: serie.color || 'black'
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
        label: `Average ${serie.name}`
      },
      yAxisIndex
    }
  })
}

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

const makeBarAndLinesGraph = (series) => {
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
      const lineGraph = makeLinesGraph([serie], { yAxisIndex: 1 })
      return lineGraph[0]
    }
  })
}

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
