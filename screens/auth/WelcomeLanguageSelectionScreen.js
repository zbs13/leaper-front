import React from 'react';
import { View, ScrollView } from 'react-native';
import Cta from '../../components/cta/Cta';
import globalStyles from '../../assets/styles/global';
import { flag } from '../../assets/styles/styles';
import global from '../../providers/global';
import { Flag } from 'react-native-svg-flagkit';
import Title from '../../components/Title';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Welcome language selection (if first app launch) screen
 * 
 * @returns 
 */
export default function WelcomeLanguageSelectionScreen({navigation}) {

    const {actions, selectors} = useApp();

    return (
        <ScrollView>
            <View style={[globalStyles.mpm, globalStyles.flexColumn, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Title>
                    {t(selectors.getLang()).welcomeLanguageSelection.SELECT_A_LANGUAGE}
                </Title>
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
                                        navigation.navigate(global.screens.LOGIN);
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