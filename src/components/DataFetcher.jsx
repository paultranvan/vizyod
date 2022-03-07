
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DataFetcher = () => {
  const [data, setData] = useState()

  useEffect(async () => {

    const result = await axios(
      'http://localhost:8080/data'
    )
    console.log('res : ', result)
    //setData(result)
  })

  return null
}

export default DataFetcher
