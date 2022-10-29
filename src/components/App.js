import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Box from '@mui/material/Box'

import DateSelector from './DateSelector'
import IntervalSelector from './IntervalSelector'
import './App.css'
import { INTERVALS } from '../lib/consts'
import useDateSelector from './hooks/useDateSelector'
import AppMenu from './menu/AppMenu'
import Query from './Query'
import { Toolbar } from '@mui/material'

const queryClient = new QueryClient()

const App = () => {
  const [interval, setInterval] = useState(INTERVALS.YEAR)
  const [pickedDate, setPickedDate] = useState(null)
  const [dataType, setDataType] = useState(null)

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval)
  }
  const handleDateChange = (newPickedDate) => {
    setPickedDate(newPickedDate)
  }

  const handleDataTypeSelection = (dataType) => {
    setDataType(dataType)
  }

  const dateRange = useDateSelector(interval, pickedDate)

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppMenu onDataType={handleDataTypeSelection} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default'}}
        >
          <Toolbar />

          <IntervalSelector
            interval={interval}
            handleChange={handleIntervalChange}
          />
          <DateSelector interval={interval} handleChange={handleDateChange} />
          {dateRange &&
            <Query model={dataType} dateRange={dateRange} />
          }
          </Box>
      </QueryClientProvider>
    </Box>
  )
}

export default App

