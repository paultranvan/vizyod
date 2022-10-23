import React from 'react'
import { Box, Divider, List } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight'
import RunCirlceIcon from '@mui/icons-material/RunCircle'
import HotelIcon from '@mui/icons-material/Hotel'

import { sleep, measure, activity, heartRate } from '../../models/models'


import MenuEntry from './MenuEntry'

const Sidebar = ({onMenuSelection }) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={null}>
      <List>
        <MenuEntry name={'Accueil'} icon={<HomeIcon />} onMenuSelection={() => null} />
        <Divider />
        <MenuEntry name={'Cardio'} type={heartRate} icon={<HeartBrokenIcon />} onMenuSelection={onMenuSelection} />
        <MenuEntry name={'Poids'} type={measure} icon={<MonitorWeightIcon />} onMenuSelection={onMenuSelection} />
        <MenuEntry name={'Sommeil'} type={sleep} icon={<HotelIcon />} onMenuSelection={onMenuSelection} />
        <MenuEntry name={'Activités'} type={activity} icon={<RunCirlceIcon />} onMenuSelection={onMenuSelection} />
      </List>
    </Box>
  )
}
export default Sidebar
