import React from 'react'
import { Box, Divider, List } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight'
import RunCirlceIcon from '@mui/icons-material/RunCircle'

import MenuEntry from './MenuEntry'

const Sidebar = () => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={null}>
      <List>
        <MenuEntry text={'Accueil'} icon={<HomeIcon />} />
        <Divider />
        <MenuEntry text={'Cardio'} icon={<HeartBrokenIcon />} />
        <MenuEntry text={'Poids'} icon={<MonitorWeightIcon />} />
        <MenuEntry text={'Activités'} icon={<RunCirlceIcon />} />
      </List>
    </Box>
  )
}
export default Sidebar
