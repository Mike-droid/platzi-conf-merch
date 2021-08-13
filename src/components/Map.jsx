import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from '../config';

export const Map = ({data}) => {
  const mapStyle = {
    height: '50vh',
    width: '100%',
  }

  const defaultCenter = {
    lat: data.lat,
    lng: data.lng,
  }

  return (
    <LoadScript googleMapsApiKey={config.google_map_api_key}>
      <GoogleMap
        MapStyle={mapStyle}
        mapContainerStyle={mapStyle}
        zoom={9}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;