import React, { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import { convertDateSingleDay } from '../lib/utils'

const DateSelector = ({ interval }) => {
  const [value, setValue] = useState(null)
  const maxDate = convertDateSingleDay(new Date())

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
