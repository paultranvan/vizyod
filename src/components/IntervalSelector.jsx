import React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { INTERVALS, INTERVALS_INDEX } from '../lib/consts'

const IntervalSelector = ({ interval, handleChange }) => {
  const onChange = (_, newIntervalIndex) => {
    for (const [key, value] of Object.entries(INTERVALS_INDEX)) {
      if (value === newIntervalIndex) {
        handleChange(key)
      }
    }
  }
  const tabs = Object.keys(INTERVALS).map((interval) => {
    return <Tab key={interval} label={interval} />
  })
  const intervalIndex = INTERVALS_INDEX[interval]

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs value={intervalIndex} onChange={onChange} centered>
        {tabs}
      </Tabs>
    </Box>
  )
}
export default IntervalSelector
