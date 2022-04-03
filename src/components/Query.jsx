import React from 'react'
import { useQuery } from 'react-query'
import Serie from './Serie'
import { getSeries } from '../queries/queries'

const Query = ({ model }) => {
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
  return <Serie model={model} data={data} />
}

export default Query
