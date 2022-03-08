import React, { useState, useEffect } from 'react'
import ReactEcharts from "echarts-for-react"
import axios from 'axios'

const Graph = () => {

  const [data, setData] = useState([])

  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/data'
      )
      console.log('res data : ', result.data)
      setData(result.data)
    }
    fetchData()
  }, [])

  const option = {
    xAxis: {
      type: 'category',
      data: data.map(night => night.date)
    },
    yAxis: {
      type: 'value'
    },
    color: ['#1446e2', '#6882d3'],
    tooltip: {
      show: true
    },
    series: [
      /*{
        data: data.map(sleep => sleep.data.total_sleep_time / 3600),
        type: 'bar'
      },*/
      {
        data: data.map(sleep => sleep.data.deepsleepduration / 3600),
        type: 'bar',
        stack: 'x',
      },
      {
        data: data.map(sleep => sleep.data.lightsleepduration / 3600),
        type: 'bar',
        stack: 'x',
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
    ]
  }
  return (
    <>
      <ReactEcharts option={option} />
    </>
  )
}

export default Graph