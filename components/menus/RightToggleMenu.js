import React, {useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { header } from '../../assets/styles/styles';
import { Avatar, Title} from 'react-native-paper';
import Cta from '../cta/Cta';
import globalStyles from '../../assets/styles/global';
import { settings } from '../../assets/styles/styles';
import { useNavigation } from '@react-navigation/native';
import global from '../../providers/global';

import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import defaultProfilePic from '../../assets/img/icons/default_profile_pic.png';

const imageUri = Image.resolveAssetSource(defaultProfilePic).uri

/**
 * right menu (settings)
 * 
 * @returns 
 */
export default function RightToggleMenu() {

    const {selectors} = useApp();
    const {actions: actionsUser, selectors: selectorsUser} = useUsers();
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };

    const [mainHeaderState, setMainHeaderState] = useState({
        profilePic: null
    });
    const Separator = () => (
      <View style={settings.separator} />
    );

    useEffect(() => {
      setMainHeaderState({
        ...mainHeaderState,
        profilePic: selectorsUser.getConnectedUser().src !== "" && selectorsUser.getConnectedUser().src !== null ? selectorsUser.getConnectedUser().src : null
      })
    }, [selectorsUser.getConnectedUser().src]);

    return (
      <View style={globalStyles.h_100}>
        <Cta _style={[header.headerProfilePic, globalStyles.m_10]} 
            onPress={toggleBottomNavigationView}
            backgroundImage={{uri: mainHeaderState.profilePic || imageUri}} //a changer selon recuperation depuis api
        />
        <BottomSheet  visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()}>
          <View style={settings.bg}>
            <Text style={settings.titleParams}>{t(selectors.getLang()).settings.TITLE}</Text>
            <Separator />
            <View style={settings.pic}>
              <Avatar.Image
                style={settings.borderPic}
                source={{uri: mainHeaderState.profilePic || imageUri}}
                size={100}
              />
              <Title style= {settings.name}>
                Michelle Lebelle
              </Title>
            </View>
            
            <View style= {settings.settings}>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.PROFIL}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.PROFIL_SETTINGS)}}
                underlayColor="transparent"
              ></Cta>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.APPLY}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.APP_SETTINGS)
                }}
                underlayColor="transparent"
              ></Cta>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.ABOUT}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.ABOUT)
                }}
                underlayColor="transparent"
              ></Cta>
            </View>
            <View style= {[settings.settings, settings.buttonLogout]}>
              <Separator />
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.LOGOUT}
                icon='log-out-outline'
                iconSize={30}
                onPress={() => actionsUser.logout()}
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }