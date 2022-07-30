import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Box from '@mui/material/Box'
import Query from './Query'
import DateSelector from './DateSelector'
import { sleep, measure, activity, heartRate } from '../models/models'
import IntervalSelector from './IntervalSelector'
import './App.css'
import { INTERVALS } from '../lib/consts'
import useDateSelector from './useDateSelector'

const queryClient = new QueryClient()

const App = () => {
  const [interval, setInterval] = useState(INTERVALS.YEAR)
  const [pickedDate, setPickedDate] = useState(null)

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval)
  }
  const handleDateChange = (newPickedDate) => {
    setPickedDate(newPickedDate)
  }

  const dateRange = useDateSelector(interval, pickedDate)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <IntervalSelector
        interval={interval}
        handleChange={handleIntervalChange}
      />
      <DateSelector interval={interval} handleChange={handleDateChange} />
      {dateRange ? (
        <QueryClientProvider client={queryClient}>
          <Query model={sleep} dateRange={dateRange} />
          <Query model={heartRate} dateRange={dateRange} />
          <Query model={activity} dateRange={dateRange} />
          <Query model={measure} dateRange={dateRange} />
        </QueryClientProvider>
      ) : null}
    </Box>
  )
}

export default App
