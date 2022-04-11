import React, { useMemo } from 'react'
import GraphSerie from './GraphSerie'
import { makeGraphFromSeries, buildYAxis } from '../lib/graph'
import { convertDateSingleDay } from '../lib/utils'

const Serie = ({ model, data }) => {
  // Filter missing values from data
  const filteredData = useMemo(() => {
    return data.filter((dataPoint) => {
      for (const serie of model.dataSeries) {
        return !!dataPoint.measure[serie.name]
      }
    })
  }, [data, model])

  // Create series based on model
  const series = useMemo(() => {
    return model.dataSeries.map((serie) => {
      return {
        data: filteredData.map((dataPoint) => {
          const value = dataPoint.measure[serie.name]
          return serie.dataTransform ? serie.dataTransform(value) : value
        }),
        name: serie.label,
        color: serie.color
      }
    })
  }, [model, filteredData])

  // Extract dates
  const dates = useMemo(
    () => filteredData.map((dataPoint) => convertDateSingleDay(dataPoint.date)),
    [filteredData]
  )

  // Build Graph
  const graphSeries = useMemo(() => {
    return makeGraphFromSeries(model.graphType, series)
  }, [model, series])

  const yAxis = useMemo(() => {
    return buildYAxis(model)
  }, [model])

  return <GraphSerie xData={dates} series={graphSeries} yAxis={yAxis} />
}

export default Serie
