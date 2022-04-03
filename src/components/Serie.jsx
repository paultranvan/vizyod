import React, { useMemo } from 'react'
import GraphSerie from './GraphSerie'
import { roundNumber } from '../lib/utils'
import { makeGraphFromSeries } from '../lib/graph'

const Serie = ({ model, data }) => {
  const series = useMemo(() => {
    return model.dataSeries.map((serie) => {
      return {
        data: data.map((dataPoint) => {
          return serie.dataTransform
            ? serie.dataTransform(dataPoint.measure[serie.name])
            : dataPoint.measure[serie.name]
        }),
        name: serie.label,
        color: serie.color
      }
    })
  }, [model, data])

  const dates = useMemo(() => data.map((dataPoint) => dataPoint.date), [data])

  const graphSeries = useMemo(() => {
    return makeGraphFromSeries(model.graphType, series)
  }, [model, series])

  return <GraphSerie xData={dates} series={graphSeries} />
}

export default Serie
