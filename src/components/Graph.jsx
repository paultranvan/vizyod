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
    series: [
      {
        data: data.map(sleep => sleep.data.total_sleep_time / 3600),
        type: 'bar'
      }
    ]
  }
  return (
    <>
      <ReactEcharts option={option} />
    </>
  )
}

export default Graph