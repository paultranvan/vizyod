import { COLORS, GRAPH_TYPES } from '../lib/consts'

export const sleep = {
  dataType: 'sleep',
  dataSeries: [
    {
      name: 'lightsleepduration',
      label: 'Light Sleep',
      color: COLORS.LIGHT_BLUE
    },
    {
      name: 'deepsleepduration',
      label: 'Deep Sleep',
      color: COLORS.DEEP_BLUE
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
  ],
  graphType: GRAPH_TYPES.BAR_AND_LINES
}
