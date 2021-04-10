import React, { useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import BackgroundImage from './BackgroundImage';
import globalStyles from '../assets/styles/global';
import Dialog from "react-native-dialog";
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import global from '../providers/global';

export default function Cta({_style, onPress, underlayColor, value, confirm = null, backgroundImage, children}) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const {selectors} = useApp();

    let color = {};
    if(Array.isArray(_style)){
        color = _style.map(obj => {
            if(typeof obj.color !== "undefined"){
                return {color: obj.color};
            }
        })
    }else if(typeof _style === "object"){
        color = typeof _style.color !== "undefined" ? {color: _style.color} : {};
    }

    return (
        <View>
            <TouchableHighlight style={_style} 
                onPress={confirm !== null ? () => setDialogVisible(true) : onPress} 
                underlayColor={typeof underlayColor === "undefined" ? "transparent" : underlayColor}>
                    <View>
                        {typeof value === "string" ?
                            <Text style={[color, globalStyles.ta_c]}>{value}</Text>
                        : 
                            typeof backgroundImage !== "undefined" && typeof value === "undefined" ?
                                <BackgroundImage
                                    image={backgroundImage} 
                                    _style={globalStyles.br_50}>
                                </BackgroundImage>
                            :
                                typeof children !== "undefined" ?
                                    children
                                :
                                    value

                        }
                    </View>
            </TouchableHighlight>
            <Dialog.Container visible={dialogVisible}>
                {confirm !== null && typeof confirm.title !== "undefined" ?
                    <Dialog.Title>
                        {confirm.title}
                    </Dialog.Title>
                :
                    null
                }
                <Dialog.Description>
                    {confirm !== null ? confirm.content : ""}
                </Dialog.Description>
                <Dialog.Button color={global.colors.MAIN_COLOR} label={t(selectors.getLang()).CANCEL} onPress={() => setDialogVisible(false)}/>
                <Dialog.Button color={global.colors.MAIN_COLOR} label={t(selectors.getLang()).OK} onPress={() => {
                    setDialogVisible(false);
                    onPress();
                }}/>
            </Dialog.Container>
        </View>
  );
}
