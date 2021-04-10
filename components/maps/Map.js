import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import global from '../../providers/global';

export default function Map({latitude, longitude, latitudeDelta = null, longitudeDelta = null, children}) {

  return (
    <MapView
        style={{width: "100%", height: "100%"}}
        region={{
            latitude: latitude, 
            longitude: longitude,
            latitudeDelta: latitudeDelta !== null ? latitudeDelta : 0.0222,
            longitudeDelta: longitudeDelta !== null ? latitudeDelta : 0.0021
        }}
    >
        {children}
    </MapView>
  );
}

export function MapPin({latitude, longitude, pinColor = null, title = null, description = null}) {

return (
  <Marker
      coordinate={{
          latitude: latitude,
          longitude: longitude
      }}
      pinColor={pinColor !== null ? pinColor : global.colors.MAIN_COLOR}
      title={title}
      description={description}
  />
);
}

