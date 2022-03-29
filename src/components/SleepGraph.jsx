import React from 'react'
import { useQuery } from 'react-query'
import GraphSerie from './GraphSerie'
import { getSeries } from '../queries/queries'
import { roundNumber } from '../lib/utils'
import { makeStackedBarGraph } from '../lib/graph'

const SleepGraph = () => {

  const { isLoading, data } = useQuery('sleep', () => getSeries('sleep', {startDate: '2022-03-01', endDate: '2022-04-01'}))
  if (isLoading) {
    return "Loading..."
  }
  if (!data) {
    return "No data"
  }

  const deepSleepData = data.map(sleep => roundNumber(sleep.measure.deepsleepduration / 3600))
  const lightSleepData = data.map(sleep => roundNumber(sleep.measure.lightsleepduration / 3600))
  const dates = data.map(sleep => sleep.date)

  const series = [
    {
      data: deepSleepData,
      name: 'Deep Sleep',
      color: COLORS.DEEP_BLUE
  const stackedBar = makeStackedBarGraph(series)
  return (
    <GraphSerie xData={dates} series={stackedBar} />
  )
}

export default SleepGraph