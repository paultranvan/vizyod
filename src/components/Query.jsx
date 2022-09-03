import React from 'react'
import { useQuery } from 'react-query'
import Serie from './Serie'
import { getSeries } from '../queries/queries'

// TODO: this component might be triggered more than necessary
const Query = ({ model, dateRange }) => {
  const queryKey = [model.dataType, dateRange.start, dateRange.end]
  const { isLoading, data } = useQuery(queryKey, () => {
    if (!dateRange.start || !dateRange.end || !model.dataType) {
      return null
    }
    return getSeries(model.dataType, {
      startDate: dateRange.start,
      endDate: dateRange.end
    })
  })

  if (isLoading) {
    return `Loading ${model.dataType}...`
  }
  if (!data) {
    return `No data found for ${model.dataType}`
  }
  return <Serie model={model} data={data} />
}

export default Query
