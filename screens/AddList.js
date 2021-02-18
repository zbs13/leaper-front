import React from 'react';
import { Text, View, Button } from 'react-native';
import PopupBottom from '../components/PopupBottom';

export default function AddList({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                Créer un groupe
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                Créer un évenement
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                Ajouter un contact
            </Text>
            <PopupBottom arrayValue= {
                [
                    {
                        value: "Créer un groupe",
                        link: ""
                    },{
                        value: "Créer un évenement",
                        link: ""
                    },{
                        value: "Ajouter un contact",
                        link: ""
                    }
                ]  
            }
            title= "Ajouter" />
            <Button  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}
                    title='Open Drawer' 
                    name="md-menu"  
                    size={30}  
                />
      </View>

    );
  }

