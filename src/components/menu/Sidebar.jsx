import React from 'react'
import { Box, Divider, List } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight'
import RunCirlceIcon from '@mui/icons-material/RunCircle'
import HotelIcon from '@mui/icons-material/Hotel'

import { sleep, weight, activity, heartRate } from '../../models/models'

import MenuEntry from './MenuEntry'
import SyncMenuEntry from './SyncMenuEntry'

const Sidebar = ({ onDataType }) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={null}>
      <List>
        <MenuEntry name={'Accueil'} icon={<HomeIcon />}/>
        <Divider />
        <MenuEntry name={'Cardio'} type={heartRate} icon={<HeartBrokenIcon />} onMenuSelection={onDataType} />
        <MenuEntry name={'Poids'} type={weight} icon={<MonitorWeightIcon />} onMenuSelection={onDataType} />
        <MenuEntry name={'Sommeil'} type={sleep} icon={<HotelIcon />} onMenuSelection={onDataType} />
        <MenuEntry name={'Activités'} type={activity} icon={<RunCirlceIcon />} onMenuSelection={onDataType} />
        <Divider />
        <SyncMenuEntry /> 
      </List>
    </Box>
  )
}
export default Sidebar
