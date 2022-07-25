import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import frLocale from 'date-fns/locale/fr'
import enLocale from 'date-fns/locale/en-US'
import { convertDateSingleDay } from '../lib/utils'
import { INTERVALS } from '../lib/consts'

// This component should be init with a default date when interval is selected
const DateSelector = ({ interval, handleChange }) => {
  const [period, setPeriod] = useState(null)

  const onChange = (newValue) => {
    setPeriod(newValue)
    handleChange(newValue)
  }

  const maxDate = convertDateSingleDay(new Date())

  const pickLocale = () => {
    const browserLocale = window.navigator.language
    if (browserLocale === 'fr') {
      return frLocale
    }
    return enLocale
  }

  const views = useMemo(() => {
    if (interval === INTERVALS.MONTH) {
      return [interval, INTERVALS.YEAR]
    } else {
      return [interval]
    }
  }, [interval])

  return (
    <Box sx={{ display: 'inline-flex', justifyContent: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={pickLocale()}>
        <DatePicker
          views={views}
          label="Date"
          minDate={new Date('2012-03-01')} // TODO: get min/max data from server
          maxDate={new Date(maxDate)}
          value={period}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DateSelector
