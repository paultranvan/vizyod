import React, { useMemo } from 'react'

import { Polyline, useMap } from 'react-leaflet'

import { polyline } from './polyline'


const findBounds = (positions) => {
  const southEastBound = [...positions[0]]
  const northWestBound = [...positions[0]]

  for (const pos of positions) {
    if (pos[0] < southEastBound[0]) {
      southEastBound[0] = pos[0]
    }
    if (pos[1] > southEastBound[1]) {
      southEastBound[1] = pos[1]
    }
    if (pos[0] > northWestBound[0]) {
      northWestBound[0] = pos[0]
    }
    if (pos[1] < northWestBound[1]) {
      northWestBound[1] = pos[1]
    }
  }
  return [northWestBound, southEastBound]
}


const ActivityMap = ({ encodedPolyline }) => {
  const map = useMap()

  const positions = polyline.decode(encodedPolyline)

  const bounds = useMemo(() => {
    return findBounds(positions)
  }, [positions])
  map.fitBounds(bounds)

  return <Polyline positions={positions} />
}

export default ActivityMap