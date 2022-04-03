import { COLORS, GRAPH_TYPES } from '../lib/consts'
import { roundNumber } from '../lib/utils'

export const sleep = {
  dataType: 'sleep',
  dataSeries: [
    {
      name: 'lightsleepduration',
      label: 'Light Sleep',
      color: COLORS.LIGHT_BLUE,
      dataTransform: (data) => roundNumber(data / 3600)
    },
    {
      name: 'deepsleepduration',
      label: 'Deep Sleep',
      color: COLORS.DEEP_BLUE,
      dataTransform: (data) => roundNumber(data / 3600)
    }
  ],
  graphType: GRAPH_TYPES.STACKED_BAR
}

export const measure = {
  dataType: 'measure',
  dataSeries: [
    {
      name: 'weight',
      label: 'Weight',
      color: COLORS.DEEP_BLUE
    },
    {
      name: 'fat_mass',
      label: 'Fat',
      color: COLORS.RED
    },
    {
      name: 'muscle_mass',
      label: 'Muscle',
      color: COLORS.GREEN
    }
    /*,
    TODO: find how to improve this graph
    {
      name: 'weight',
      label: 'Weight',
      color: COLORS.DEEP_BLUE,
      isTotal: true
    }*/
  ],
  graphType: GRAPH_TYPES.STACKED_LINES
}

export const activity = {
  dataType: 'activity',
  dataSeries: [
    {
      name: 'calories',
      label: 'Calories',
      color: COLORS.DEEP_BLUE
    }
  ],
  graphType: GRAPH_TYPES.STACKED_BAR
}
