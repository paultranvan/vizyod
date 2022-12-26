import { DATA_TYPES } from '../lib/consts'
import { COLORS, GRAPH_TYPES } from '../lib/consts'
import { roundNumber } from '../lib/utils'

export const sleep = {
  dataType: DATA_TYPES.SLEEP,
  unit: 'Hours',
  dataSeries: [
    {
      name: 'deepsleepduration',
      label: 'Deep Sleep',
      color: COLORS.DEEP_BLUE,
      dataTransform: (data) => roundNumber(data / 3600)
    },
    {
      name: 'lightsleepduration',
      label: 'Light Sleep',
      color: COLORS.LIGHT_BLUE,
      dataTransform: (data) => roundNumber(data / 3600)
    }
  ],
  graphType: GRAPH_TYPES.STACKED_BAR
}

export const weight = {
  dataType: DATA_TYPES.WEIGHT,
  unit: 'Kg',
  dataSeries: [
    {
      name: 'bone_mass',
      label: 'Bone',
      color: COLORS.YELLOW
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
  graphType: GRAPH_TYPES.STACKED_LINES
}

export const dailyMeasure = {
  dataType: DATA_TYPES.DAILY_MEASURE,
  dataSeries: [
    {
      name: 'steps',
      label: 'Steps',
      color: COLORS.DEEP_BLUE,
      unit: 'Steps'
    },
    {
      // TODO: add total calories
      name: 'calories',
      label: 'Active calories',
      color: 'black',
      unit: 'Kcal',
      yAxisIndex: 1,
      dataTransform: (data) => roundNumber(data, { decimals: 0 })
    }
  ],
  graphType: GRAPH_TYPES.BAR_AND_LINES
}

export const heartRate = {
  // TODO: avg daily values are false (avg of avg with different cardinalities...)
  // we need high frequency data
  dataType: DATA_TYPES.HEART,
  unit: 'Bpm',
  dataSeries: [
    {
      name: 'hr_average',
      label: 'Hearth rate',
      color: COLORS.DEEP_BLUE
    }
  ],
  graphType: GRAPH_TYPES.LINES
}
