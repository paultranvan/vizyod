import { MapContainer, TileLayer } from "react-leaflet"
import ActivityMap from "./ActivityMap"

import 'leaflet/dist/leaflet.css'

const Map = ({ encodedPolyline }) => {
  return (
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '40vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ActivityMap encodedPolyline={encodedPolyline} />
      </MapContainer>
  )
}

export default Map