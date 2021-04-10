import React, {useState} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { header } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import { Avatar, Title} from 'react-native-paper';
import Cta from '../Cta';
import globalStyles from '../../assets/styles/global';
import { Button } from 'react-native-elements'


import { Image } from 'react-native';
import profilImage from '../../assets/img/profil/profil1.jpg';
const imageUri = Image.resolveAssetSource(profilImage).uri

export default function RightToggleMenu(props) {



    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };

    const [mainHeaderState] = useState({
        profilePic: null
    });
    const Separator = () => (
      <View style={styles.separator} />
    );
    

    return (
      <View>
        <Cta _style={[header.headerProfilePic, globalStyles.m_10]} 
            onPress={toggleBottomNavigationView}
            backgroundImage={mainHeaderState.profilePic === null ? require('../../assets/img/default_profile_pic.png') : ''} //a changer selon recuperation depuis api
        />
        <BottomSheet  visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()}>
          <View style={styles.bg}>
            <Text style={styles.titleParams}>Paramètres</Text>
            <Separator />
            <View style={styles.pic}>
              <Avatar.Image
                source={{uri: imageUri}}
                size={150}
              />
              <Title style= {styles.name}>
                Michelle Lebelle
              </Title>
            </View>
            
            <View style= {styles.settings}>
              <Button   
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonFont}
                onPress={() => {}}
                title='Gestion du profil'
              />
              <Button 
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonFont}  
                onPress={() => {}}
                title='Gestion de l application '
              />
              <Button 
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonFont}
                onPress={() => {}}
                title='A propos'
              />
            </View>
            <View style= {styles.settings}>
              <Separator />
              <Button 
                icon={
                  <Ionicons
                    name= 'log-out-outline'            
                    size={40}
                    style={{marginRight: 30}}
                  />
                }
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonFont}
                onPress={() => {}}
                title='Déconnexion'
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }

  const styles = StyleSheet.create({
    bg: {
      backgroundColor: 'white',
      height: 750, 
      display: "flex"
    },
    pic: {
      alignContent: "center",
      alignItems: "center",
      marginTop: 30
    },
    titleParams:{
      fontSize: 33,
      margin: 10
    },
    settings:{
      marginTop: 50
    },
    buttonStyle: {
      backgroundColor: 'white',
      margin: 10
    },
    buttonFont: {
      color: "black",
      fontSize: 25,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    name: {
      fontSize: 25
    }
  });