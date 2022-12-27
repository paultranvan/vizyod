import { Box, Typography } from '@mui/material'
import Map from './Map'

const MapList = ({data}) => {
  return (
      data.map(serie => {
        return (
          <Box id={serie.date} sx={{ margin: 'auto', width: '60%', pt: 4 }}>
            <Typography variant="h4">{serie.date.split('T')[0]}</Typography>
            <Typography variant="body1">
              Distance: {serie.measure.distance / 1000} km
            </Typography>
            <Typography variant="body1">
              Durée: {Math.round(serie.measure.elapsed_time / 60 * 10) / 10} min
            </Typography>
            <Typography variant="body1">
              Speed: {Math.round(serie.measure.average_speed * 3.6 * 10) / 10} km/h
            </Typography>
            <Map encodedPolyline={serie.measure.map.summary_polyline} />
          </Box>
        )
      })
  )
}

export default MapList
