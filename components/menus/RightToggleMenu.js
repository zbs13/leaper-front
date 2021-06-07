import React, {useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { header } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Title} from 'react-native-paper';
import Cta from '../cta/Cta';
import globalStyles from '../../assets/styles/global';
import { Button } from 'react-native-elements'
import { settings } from '../../assets/styles/styles'
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import defaultProfilePic from '../../assets/img/icons/default_profile_pic.png';

const imageUri = Image.resolveAssetSource(defaultProfilePic).uri

export default function RightToggleMenu(props) {

    const {selectors} = useApp();
    const {actions: actionsUser, selectors: selectorsUser} = useUsers();

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
      <View>
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
              <Button   
                buttonStyle={settings.buttonStyle}
                titleStyle={settings.buttonFont}
                onPress={() => {}}
                title={t(selectors.getLang()).settings.PROFIL}
              />
              <Button 
                buttonStyle={settings.buttonStyle}
                titleStyle={settings.buttonFont}  
                onPress={() => {}}
                title={t(selectors.getLang()).settings.APPLY}
              />
              <Button 
                buttonStyle={settings.buttonStyle}
                titleStyle={settings.buttonFont}
                onPress={() => {}}
                title={t(selectors.getLang()).settings.ABOUT}
              />
            </View>
            <View style= {[settings.settings, settings.buttonLogout]}>
              <Separator />
              <Button 
                icon={
                  <Ionicons
                    name= 'log-out-outline'            
                    size={30}
                    style={{marginRight: 30}}
                  />
                }
                buttonStyle={settings.buttonStyle}
                titleStyle={settings.buttonFont}
                onPress={() => actionsUser.logout()}
                title={t(selectors.getLang()).settings.LOG_OUT}
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }