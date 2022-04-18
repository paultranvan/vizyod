import React, { useState, useEffect, useMemo } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import frLocale from 'date-fns/locale/fr'
import enLocale from 'date-fns/locale/en-US'
import { convertDateSingleDay } from '../lib/utils'
import { INTERVALS } from '../lib/consts'
import { getYear, getMonth, startOfMonth, startOfYear } from 'date-fns'

const DateSelector = ({ interval }) => {
  const [period, setPeriod] = useState(null)
  useEffect(() => {
    if (interval === INTERVALS.YEAR) {
      setPeriod(startOfYear(new Date()))
    } else if (interval === INTERVALS.MONTH) {
      setPeriod(startOfMonth(new Date()))
    } else {
      setPeriod(new Date())
    }
  }, [interval])

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
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={pickLocale()}>
        <DatePicker
          views={views}
          label="Date"
          minDate={new Date('2012-03-01')}
          maxDate={new Date(maxDate)}
          value={period}
          onChange={(newValue) => {
            setPeriod(newValue)
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
          centered
        />
      </LocalizationProvider>
    </>
  )
}

export default DateSelector
