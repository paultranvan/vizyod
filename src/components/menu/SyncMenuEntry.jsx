import React, { useState } from 'react'
import SyncIcon from '@mui/icons-material/Sync'
import { sync } from '../../queries/queries'
import { useQuery } from 'react-query'
import MenuEntry from './MenuEntry'

const SyncMenuEntry = () => {
  const [enableQuery, setEnableQuery] = useState(false)
  
  const { isFetching } = useQuery('sync', () => {
    return sync()
  }, {
    cacheTime: 0,
    enabled: enableQuery, 
    onSettled: () => {
      setEnableQuery(false)  
    }
  })

  const spinProperties = {
    animation: "spin 2s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  }
  const icon = isFetching ? <SyncIcon sx={spinProperties} /> : <SyncIcon />

  return (
    <MenuEntry name="Sync" icon={icon} onMenuSelection={() => setEnableQuery(true)} />
  )
}
export default SyncMenuEntry
