import React, { useState } from 'react';
import { TextInput, View, Text, Image, StyleSheet } from 'react-native';
import { tchatBar } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import OptionsModal from '../modals/OptionsModal';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cta from '../cta/Cta';
import * as ImagePicker from 'expo-image-picker';

export default function TchatBar({onSend}){

    const {selectors} = useApp();

    const [tchatState, setTchatState] = useState({
        textValue: "",
        attachment: ""
    })

    async function pickImage(){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.cancelled) {
            setTchatState({...tchatState, attachment: result.uri});
        }
    };

    return(
        <View style={[globalStyles.flexRow, globalStyles.alignEnd, tchatBar.container]}>
            <View style={{flex: 0.5}}>
                <OptionsModal 
                    icon="attach-outline"
                    options={
                        [
                            {
                                value: "Caméra",
                                icon: "camera-outline",
                                action: () => alert("aa")
                            },
                            {
                                value: "Bibliothèque photos/vidéos",
                                icon: "images-outline",
                                action: () => pickImage()
                            },
                            {
                                value: "Document",
                                icon: "document-outline",
                                action: () => alert("ta mere")
                            },
                        ]
                    }
                />
            </View>
            <View style={{flex: 2}}>
                {tchatState.attachment !== "" ?
                    <View style={[globalStyles.w_100, {backgroundColor: global.colors.VERY_LIGHT_GREY}]}>
                        <Image
                            style={styles.tinyLogo}
                            source={{uri: tchatState.attachment}}
                            resizeMode="contain"
                        />
                    </View>
                :
                    null
                }
                <TextInput 
                    multiline
                    onChangeText={(value) => setTchatState({...tchatState, textValue: value})}
                    value={tchatState.textValue}
                    placeholder={t(selectors.getLang()).WRITE_A_MESSAGE}
                    style={tchatBar.input}
                />
            </View>
            <View style={[{flex: 0.5}, globalStyles.p_5, globalStyles.alignCenter]}>
                    <Cta onPress={() => alert("non")}>
                        <Ionicons name="send" color={global.colors.MAIN_COLOR} size={30}/>
                    </Cta>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: "100%",
      height: 200,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });