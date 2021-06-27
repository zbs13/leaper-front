import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import Cta from '../components/cta/Cta';
import globalStyles from '../assets/styles/global';
import { flag } from '../assets/styles/styles';
import global from '../providers/global';
import { Flag } from 'react-native-svg-flagkit';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * change language settings screen
 * 
 * @returns 
 */
export default function ChangeLanguageScreen({navigation}) {
    const  {selectors, actions} = useApp();
    
    useEffect(() => {
      navigation.setOptions({
          headerTitle: t(selectors.getLang()).changeLanguage.TITLE
      });
    }, [])

    return (
      <ScrollView>
            <View style={[globalStyles.mpm, globalStyles.flexColumn, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <View style={globalStyles.mt_20}>
                    {
                        global.AVAILABLE_LANGUAGES.map((country, index) =>
                            <Cta
                                key={index}
                                onPress={() => {
                                    actions.updateUserParameters({
                                        lang: country,
                                        isFirstLaunch: false
                                    });
                                    AsyncStorage.setItem("isFirstLaunch", "false");
                                    AsyncStorage.setItem("lang", JSON.stringify(country)).then(function(){
                                        navigation.goBack()
                                    });
                                }}
                            >
                                <View style={flag.container}>
                                    <Flag 
                                        id={country.flag}
                                        size={0.5}
                                    />
                                </View>
                            </Cta>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
  }