import { useEffect, useState } from 'react'
import {
  startOfDay,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfMonth,
  endOfYear
} from 'date-fns'
import { INTERVALS } from '../../lib/consts'

const useDateSelector = (interval, pickedDate) => {
  const [dateRange, setDateRange] = useState(null)

  useEffect(() => {
    let start, end
    const date = pickedDate === null ? new Date() : pickedDate

    if (interval === INTERVALS.YEAR) {
      start = startOfYear(date)
      end = endOfYear(start)
    } else if (interval === INTERVALS.MONTH) {
      start = startOfMonth(date)
      end = endOfMonth(start)
    } else {
      start = startOfDay(date)
      end = endOfDay(start)
    }
    setDateRange({ start, end })
  }, [interval, pickedDate])

  return dateRange
}
export default useDateSelector
