import React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

const MenuEntry = ({ name, type, icon, onMenuSelection }) => {
  return (
    <ListItem key={name} disablePadding onClick={() => onMenuSelection(type)}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}
export default MenuEntry
