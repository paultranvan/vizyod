import React, { useMemo } from 'react'
import ReactEcharts from 'echarts-for-react'

const GraphSerie = ({ xData, series }) => {
  const option = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        show: true,
        y: 'bottom',
        formatter: (name) => {
          //let itemValue = data.filter(item => item.name === name)
          //return `${name}: ${itemValue[0].value}`
          return name
        }
      },
      series
    }
  }, [xData, series])

  return (
    <>
      <ReactEcharts option={option} />
    </>
  )
}

export default GraphSerie
