import React, {useState} from 'react';
import { View,Text } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { header } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Title} from 'react-native-paper';
import Cta from '../Cta';
import globalStyles from '../../assets/styles/global';
import { Button } from 'react-native-elements'
import { settings } from '../../assets/styles/styles'

import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';

import { Image } from 'react-native';
import profilImage from '../../assets/img/profil/profil1.jpg';
const imageUri = Image.resolveAssetSource(profilImage).uri

export default function RightToggleMenu(props) {

    const  {selectors} = useApp();

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };

    const [mainHeaderState] = useState({
        profilePic: null
    });
    const Separator = () => (
      <View style={settings.separator} />
    );

    return (
      <View>
        <Cta _style={[header.headerProfilePic, globalStyles.m_10]} 
            onPress={toggleBottomNavigationView}
            backgroundImage={mainHeaderState.profilePic === null ? require('../../assets/img/default_profile_pic.png') : ''} //a changer selon recuperation depuis api
        />
        <BottomSheet  visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()}>
          <View style={settings.bg}>
            <Text style={settings.titleParams}>{t(selectors.getLang()).settings.TITLE}</Text>
            <Separator />
            <View style={settings.pic}>
              <Avatar.Image
                style={settings.borderPic}
                source={{uri: imageUri}}
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
                onPress={() => {}}
                title='Déconnexion'
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }