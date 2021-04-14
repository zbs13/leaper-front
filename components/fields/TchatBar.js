import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
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
            aspect: [4, 3],
            quality: 1,
        });
    
        // console.log(result);
    
        // if (!result.cancelled) {
        //     setImage(result.uri);
        // }
    };

    return(
        <View style={[globalStyles.flexRow, globalStyles.alignCenter, tchatBar.container]}>
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
                <TextInput 
                    multiline
                    onChangeText={(value) => setTchatState({textValue: value})}
                    value={tchatState.textValue}
                    placeholder={t(selectors.getLang()).WRITE_A_MESSAGE}
                    style={tchatBar.input}
                />
            </View>
            <View style={[{flex: 0.5}, globalStyles.alignCenter]}>
                    <Cta onPress={() => alert("non")}>
                        <Ionicons name="send-outline" color={global.colors.ANTHRACITE} size={30}/>
                    </Cta>
            </View>
        </View>
    )
}