import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import global from '../../providers/global';

/**
 * Map
 * 
 * @param {number} latitude map latitude
 * @param {number} longitude map longitude
 * @param {number|null} latitudeDelta map latitude delta
 * @param {number|null} longitudeDelta map longitude delta
 * @param {object} children children
 * @returns 
 */
export default function Map({
  latitude, 
  longitude, 
  latitudeDelta = null, 
  longitudeDelta = null, 
  onPress = () => {},
  children
}) {

  return (
    <MapView
        style={{width: "100%", height: "100%"}}
        region={{
            latitude: latitude, 
            longitude: longitude,
            latitudeDelta: latitudeDelta !== null ? latitudeDelta : global.map.DEFAULT_ZOOM_LATITUDE_DELTA,
            longitudeDelta: longitudeDelta !== null ? longitudeDelta : global.map.DEFAULT_ZOOM_LONGITUDE_DELTA
        }}
        onPress={onPress}
    >
        {children}
    </MapView>
  );
}

/**
 * Map pin/mark
 * 
 * @param {number} latitude pin latitude
 * @param {number} longitude pin longitude
 * @param {string|null} pinColor pin color
 * @param {string|null} title pin title
 * @param {string|null} description pin description
 * @returns 
 */
export function MapPin({
  latitude, 
  longitude, 
  pinColor = null, 
  title = null, 
  description = null,
  onPress = () => {}
}) {

return (
  <Marker
      coordinate={{
          latitude: latitude,
          longitude: longitude
      }}
      pinColor={pinColor !== null ? pinColor : global.colors.MAIN_COLOR}
      title={title}
      description={description}
      onPress={onPress}
  />
);
}

