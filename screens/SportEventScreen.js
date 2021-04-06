import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import SB from '../components/search/SearchBar';
import Title from '../components/Title';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';

export default function SportEventScreen({navigation, route}) {

  const sport = route.params.name 

  const {selectors} = useApp();
  const [value, setValue] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerTitle: sport,
    });
  });

  return (
    <View style={globalStyles.mpm}>
      <Title>
        {t(selectors.getLang()).EVENTS} : {sport}
      </Title>
      <SB
          placeholder={t(selectors.getLang()).FIND_EVENT_BY + " : " + sport}
          onChangeText={(val) => setValue(val)}
          value={value}
          cancelButtonTitle={t(selectors.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />

    </View>
  );
}