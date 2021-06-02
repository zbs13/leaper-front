import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import Map, { MapPin } from '../components/maps/Map';
import useUsers from '../hooks/useUsers';
import useApp from '../hooks/useApp';
import global from '../providers/global';
import _ from 'lodash';
import { mapFavs } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import { RefreshViewList } from '../components/RefreshView';
import Title from '../components/Title';
import BookmarkCard from '../components/cards/BookmarkCard';
import t from '../providers/lang/translations';

/**
 * bookmark list screen
 * @returns 
 */
export default function ListBookmarksScreen() {

  const {selectors: selectorsApp} = useApp();
  const {selectors} = useUsers();

  const [fav, setFav] = useState({
    userBookmarks: [],
    focusLatitude: global.map.DEFAULT_NOT_ZOOM_LATITUDE,
    focusLongitude: global.map.DEFAULT_NOT_ZOOM_LONGITUDE,
    focusLatitudeDelta: global.map.DEFAULT_FAVS_NOT_ZOOM_LATITUDE_DELTA,
    focusLongitudeDelta: global.map.DEFAULT_FAVS_NOT_ZOOM_LONGITUDE_DELTA
  })

  useEffect(() => {
    const favs = selectors.getConnectedUser().bookmarks.length !== 0 ? _.reverse(selectors.getConnectedUser().bookmarks) : [];
    setFav({
      ...fav,
      userBookmarks: favs,
      focusLatitude: favs.length !== 0 ? favs[0].location.latitude : global.map.DEFAULT_NOT_ZOOM_LATITUDE,
      focusLongitude: favs.length !== 0 ? favs[0].location.longitude : global.map.DEFAULT_NOT_ZOOM_LONGITUDE
    })
  }, [selectors.getConnectedUser().bookmarks])

  return (
    <View style={[globalStyles.mpm, globalStyles.flexColumn]} >
      <View style={mapFavs.container}>
        <Map
          latitude={fav.focusLatitude}
          longitude={fav.focusLongitude}
          latitudeDelta={fav.focusLatitudeDelta}
          longitudeDelta={fav.focusLongitudeDelta}
        >
          {
            fav.userBookmarks.map((bookmark, index) => (
              <MapPin 
                key={index}
                latitude={bookmark.location.latitude}
                longitude={bookmark.location.longitude}
                title={bookmark.name}
                description={bookmark.address}
                onPress={(e) => setFav({
                  ...fav,
                  focusLatitude: e.nativeEvent.coordinate.latitude,
                  focusLongitude: e.nativeEvent.coordinate.longitude,
                  focusLatitudeDelta: global.map.DEFAULT_ZOOM_LATITUDE_DELTA,
                  focusLongitudeDelta: global.map.DEFAULT_ZOOM_LONGITUDE_DELTA
                })}
              />
            ))
          }
        </Map>
      </View>
      <View style={[globalStyles.mpm, globalStyles.flexColumn]}>
        <Title>
          {t(selectorsApp.getLang()).bookmarks.MY_BOOKMARKS}
        </Title>
        <RefreshViewList
          data={fav.userBookmarks}
          noDataMessage={t(selectorsApp.getLang()).bookmarks.NO_BOOKMARK}
          onRefresh={() => console.log("az")}
          renderItem={({item}) => 
            <BookmarkCard item={item} />
          }
        />
      </View>
    </View>
  );
}

