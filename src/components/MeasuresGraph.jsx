import React from 'react'
import { useQuery } from 'react-query'
import GraphSerie from './GraphSerie'
import { getSeries } from '../queries/queries'
import { roundNumber, convertDateSingleDay } from '../lib/utils'
import { makeBarAndLinesGraph } from '../lib/graph'


const MeasuresGraph = () => {

  const { isLoading, data } = useQuery('measures', () => getSeries('measure'))

  if (isLoading) {
    return "Loading..."
  }
  if (!data) {
    return "No data"
  }

  const weightData = data.map(serie => {
    const measures = serie.measures
    const weight = measures.find(m => m.type === 1)
    return weight ? roundNumber(weight.value / 1000) : null
  })
  const fatData = data.map(serie => {
    const measures = serie.measures
    const fat = measures.find(m => m.type === 5)
    return fat ? roundNumber(fat.value / 1000) : null
  })
  const muscleData = data.map(serie => {
    const measures = serie.measures
    const muscle = measures.find(m => m.type === 76)
    return muscle ? roundNumber(muscle.value / 1000) : null
  })
  const dates = data.map(serie => convertDateSingleDay(serie.date * 1000))

  const series = [{data: weightData, name: 'Weight'}, {data: fatData, name: 'Fat'}, {data: muscleData, name: 'Muscle'}]
  const stackedBar = makeBarAndLinesGraph(series)
  return (
    <GraphSerie xData={dates} series={stackedBar} />
  )
}

export default MeasuresGraph