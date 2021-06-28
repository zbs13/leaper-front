import React, {useEffect, useState} from 'react';
import { View, Image, ScrollView } from 'react-native';
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

    const {actions, selectors} = useApp();
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
      let isMounted = true;
      if(isMounted){
        setMainHeaderState({
          ...mainHeaderState,
          profilePic: selectorsUser.getConnectedUserProfilePic()
        })
      }
      return () => { isMounted = false };
    }, [selectorsUser.getConnectedUserProfilePic()]);

    return (
      <View >
        <Cta _style={[header.headerProfilePic, globalStyles.m_10]} 
            onPress={toggleBottomNavigationView}
            backgroundImage={{uri: mainHeaderState.profilePic || imageUri}} //a changer selon recuperation depuis api
        />
        <BottomSheet visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()}>
          <View style={settings.bg}>
            <View style={settings.pic}>
              <Avatar.Image
                style={settings.borderPic}
                source={{uri: mainHeaderState.profilePic || imageUri}}
                size={100}
              />
              <Title style={settings.name}>
                {selectorsUser.getConnectedUser().firstname} {selectorsUser.getConnectedUser().lastname}
              </Title>
            </View>
            
            <ScrollView style= {settings.settings}>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.PROFIL}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.PROFILE_SETTINGS)}}
                underlayColor="transparent"
                icon="person-outline"
                iconSize={25}
              ></Cta>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.APPLY}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.APP_SETTINGS)
                }}
                underlayColor="transparent"
                icon="cog-outline"
                iconSize={25}
              ></Cta>
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.ABOUT}
                onPress={() => {
                  toggleBottomNavigationView()
                  navigation.navigate(global.screens.ABOUT)
                }}
                underlayColor="transparent"
                icon="information-circle-outline"
                iconSize={25}
              ></Cta>
            </ScrollView>
            <View style= {[settings.settings, settings.buttonLogout]}>
              <Separator />
              <Cta
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).settings.LOGOUT}
                icon='log-out-outline'
                iconSize={25}
                onPress={() => actionsUser.logout(function(){
                  actions.updateIsConnected(false);
                })}
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }