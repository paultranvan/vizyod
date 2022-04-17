import React, { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import frLocale from 'date-fns/locale/fr'
import enLocale from 'date-fns/locale/en-US'
import { convertDateSingleDay } from '../lib/utils'

const DateSelector = ({ interval }) => {
  const [value, setValue] = useState(null)
  const maxDate = convertDateSingleDay(new Date())

  const pickLocale = () => {
    const browserLocale = window.navigator.language
    if (browserLocale === 'fr') {
      return frLocale
    }
    return enLocale
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={pickLocale()}>
        <DatePicker
          views={[interval]}
          label="Date"
          minDate={new Date('2012-03-01')}
          maxDate={new Date(maxDate)}
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
          centered
        />
      </LocalizationProvider>
    </>
  )
}

export default DateSelector
