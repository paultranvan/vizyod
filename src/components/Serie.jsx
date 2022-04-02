import React from 'react'
import { useQuery } from 'react-query'
import GraphSerie from './GraphSerie'
import { getSeries } from '../queries/queries'
import { roundNumber } from '../lib/utils'
import { makeGraphFromSeries } from '../lib/graph'

const Serie = ({ model }) => {
  const { isLoading, data } = useQuery(model.dataType, () =>
    getSeries(model.dataType, {
      startDate: '2022-03-01',
      endDate: '2022-04-01'
    })
  )
  if (isLoading) {
    return `Loading ${model.dataType}...`
  }
  if (!data) {
    return `No data found for ${model.dataType}`
  }

  const series = model.dataSeries.map((serie) => {
    return {
      data: data.map((dataPoint) => roundNumber(dataPoint.measure[serie.name])),
      name: serie.label,
      color: serie.color
    }
  })
  const dates = data.map((dataPoint) => dataPoint.date)

  const graphSeries = makeGraphFromSeries(model.graphType, series)
  return <GraphSerie xData={dates} series={graphSeries} />
}

export default Serie
