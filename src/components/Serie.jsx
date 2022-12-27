import React, { useMemo } from 'react'
import GraphSerie from './GraphSerie'
import { DATA_TYPES } from '../lib/consts'
import MapList from './map/MapList'

const Serie = ({ model, data }) => {
  // Filter missing values from data
  const filteredData = useMemo(() => {
    return data.filter((dataPoint) => {
      return !!model.dataSeries.find((serie) => dataPoint.measure[serie.name])
    })
  }, [data, model])

  return model.dataType === DATA_TYPES.ACTIVITY ? (
    <MapList data={data} /> // TODO: filter data
  ) : (
    <GraphSerie model={model} data={filteredData} />
  )
}

export default Serie
