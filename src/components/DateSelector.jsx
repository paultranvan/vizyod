import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import frLocale from 'date-fns/locale/fr'
import enLocale from 'date-fns/locale/en-US'
import add from 'date-fns/add'
import sub from 'date-fns/sub'
import { convertDateSingleDay } from '../lib/utils'
import { INTERVALS } from '../lib/consts'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import IconButton from '@mui/material/IconButton'

const DateSelector = ({ interval, handleChange }) => {
  const [date, setDate] = useState(new Date())

  const onChange = (newValue) => {
    setDate(newValue)
    handleChange(newValue)
  }

  const onLeftArrow = () => {
    let newDate
    if (interval === INTERVALS.YEAR) {
      newDate = sub(date, { years: 1 })
    } else if (interval === INTERVALS.MONTH) {
      newDate = sub(date, { months: 1 })
    } else if (interval === INTERVALS.DAY) {
      newDate = sub(date, { days: 1 })
    } else {
      throw new Error('Interval not supported')
    }
    setDate(newDate)
    handleChange(newDate)
  }

  const onRightArrow = () => {
    let newDate
    if (interval === INTERVALS.YEAR) {
      newDate = add(date, { years: 1 })
    } else if (interval === INTERVALS.MONTH) {
      newDate = add(date, { months: 1 })
    } else if (interval === INTERVALS.DAY) {
      newDate = add(date, { days: 1 })
    } else {
      throw new Error('Interval not supported')
    }
    setDate(newDate)
    handleChange(newDate)
  }

  const pickLocale = () => {
    const browserLocale = window.navigator.language
    if (browserLocale === 'fr') {
      return frLocale
    }
    return enLocale
  }

  const maxDate = convertDateSingleDay(new Date())

  const views = useMemo(() => {
    if (interval === INTERVALS.MONTH) {
      return [interval, INTERVALS.YEAR]
    } else {
      return [interval]
    }
  }, [interval])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton
        sx={{ fontSize: 30, pt: 2, pl: 2, mr: 1 }}
        onClick={onLeftArrow}
      >
        <ArrowBackIosIcon color="action" />
      </IconButton>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pickLocale()}>
        <DatePicker
          views={views}
          label="Date"
          minDate={new Date('2012-03-01')} // TODO: get min/max data from server
          maxDate={new Date(maxDate)}
          value={date}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      <IconButton
        sx={{ fontSize: 30, pt: 2, pl: 2, ml: 1 }}
        onClick={onRightArrow}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}

export default DateSelector
