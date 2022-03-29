import React from 'react'
import { useQuery } from 'react-query'
import GraphSerie from './GraphSerie'
import { getSeries } from '../queries/queries'
import { convertDateSingleDay } from '../lib/utils'
import { makeBarAndLinesGraph } from '../lib/graph'


const MeasuresGraph = () => {

  const { isLoading, data } = useQuery('measures', () => getSeries('measure'))

  if (isLoading) {
    return "Loading..."
  }
  if (!data) {
    return "No data"
  }

  const filteredData = data.filter(serie => serie.measure.weight && serie.measure.fat_mass && serie.measure.muscle_mass)
  const weightData = filteredData.map(serie => serie.measure.weight)
  const fatData = filteredData.map(serie => serie.measure.fat_mass)
  const muscleData = filteredData.map(serie => serie.measure.muscle_mass)
  const dates = filteredData.map(serie => convertDateSingleDay(serie.date))

  const series = [{data: weightData, name: 'Weight'}, {data: fatData, name: 'Fat'}, {data: muscleData, name: 'Muscle'}]
  const stackedBar = makeBarAndLinesGraph(series)
  return (
    <GraphSerie xData={dates} series={stackedBar} />
  )
}

export default MeasuresGraph