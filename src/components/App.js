import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Query from './Query'
import DatesSelector from './DateSelector'
import { sleep, measure, activity, heartRate } from '../models/models'
import IntervalSelector from './IntervalSelector'
import './App.css'
import { INTERVALS } from '../lib/consts'

const queryClient = new QueryClient()

const App = () => {
  const [interval, setInterval] = useState(INTERVALS.YEAR)

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval)
  }

  return (
    <>
      <IntervalSelector
        interval={interval}
        handleChange={handleIntervalChange}
      />
      <DatesSelector interval={interval} />
      <QueryClientProvider client={queryClient}>
        <Query model={sleep} />
        <Query model={measure} />
        <Query model={activity} />
        <Query model={heartRate} />
      </QueryClientProvider>
    </>
  )
}

export default App
