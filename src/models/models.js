import { COLORS, GRAPH_TYPES } from '../lib/consts'
import { roundNumber } from '../lib/utils'

export const sleep = {
  dataType: 'sleep',
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

export const measure = {
  dataType: 'measure',
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
      name: 'steps',
      label: 'Steps',
      color: COLORS.DEEP_BLUE
    },
    {
      // TODO: add total calories
      // TODO: 2 Y axis: https://echarts.apache.org/examples/en/editor.html?c=mix-line-bar
      name: 'calories',
      label: 'Active calories (Kcal)',
      color: 'black'
    }
  ],
  graphType: GRAPH_TYPES.BAR_AND_LINES
}

export const heartRate = {
  dataType: 'activity',
  dataSeries: [
    {
      name: 'hr_average',
      label: 'Hearth rate',
      color: COLORS.DEEP_BLUE
    }
  ],
  graphType: GRAPH_TYPES.LINES
}
