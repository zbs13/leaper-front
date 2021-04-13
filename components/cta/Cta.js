import React, { useState } from 'react';
import { Text, View, TouchableHighlight, Animated } from 'react-native';
import BackgroundImage from '../BackgroundImage';
import globalStyles from '../../assets/styles/global';
import Dialog from "react-native-dialog";
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';
import { cta } from '../../assets/styles/styles';

export default function Cta({
    _style, 
    onPress, 
    onLongPress = null, 
    underlayColor, 
    value, 
    confirm = null, 
    backgroundImage, 
    children, 
    icon = null, 
    iconSize = null, 
    iconColor = null, 
    swipeableRightOptions = null,
    swipeableLeftOptions = null
}) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const {selectors} = useApp();

    let color = {};
    let fontSize = {};
    let textAlign = {};
    if(Array.isArray(_style)){
        _style.map(obj => {
            if(typeof obj === "object"){
                if(typeof obj.color !== "undefined"){
                    color = {color: obj.color};
                }
                if(typeof obj.fontSize !== "undefined"){
                    fontSize = {fontSize: obj.fontSize};
                }
                if(typeof obj.textAlign !== "undefined"){
                    textAlign = {textAlign: obj.textAlign};
                }
            }
        })
    }else if(typeof _style === "object"){
        color = typeof _style.color !== "undefined" ? {color: _style.color} : {};
        fontSize = typeof _style.fontSize !== "undefined" ? {fontSize: _style.fontSize} : {};
        textAlign = typeof _style.textAlign !== "undefined" ? {textAlign: _style.textAlign} : {};
    }

    function ctaRender(){
        return (
            <View>
                <TouchableHighlight style={_style} 
                    onPress={confirm !== null ? () => setDialogVisible(true) : onPress} 
                    underlayColor={typeof underlayColor === "undefined" ? "transparent" : underlayColor}
                    onLongPress={onLongPress !== null ? onLongPress : null}
                >
                    <View>
                        {typeof value === "string" ?
                            icon !== null ?
                                <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                    <Ionicons style={{marginRight: 5}} name={icon} size={iconSize !== null ? iconSize : 20} color={iconColor !== null ? iconColor : global.colors.ANTHRACITE} />
                                    <Text style={[color, fontSize, globalStyles.ta_c, textAlign]}>{value}</Text>
                                </View>
                            :
                                <Text style={[color, fontSize, globalStyles.ta_c, textAlign]}>{value}</Text>
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
        )
    }

    function swipeableMenu(progress, dragX, side){
        let options = side === "left" ? swipeableLeftOptions : swipeableRightOptions
        return (
            <View style={[globalStyles.flexRow, globalStyles.h_100]}>
                {options.map((param, idx) => 
                    <View key={idx}>
                        <Cta 
                            _style={[cta.first_nr, param.style, globalStyles.p_10, globalStyles.h_100, globalStyles.justifyCenter]} 
                            onPress={param.action}
                            value={typeof param.value !== "undefined" ? param.value : null}
                            confirm={typeof param.confirm !== "undefined" ? param.confirm : null}
                            icon={typeof param.icon !== "undefined" ? param.icon : null}
                            iconSize={typeof param.iconSize !== "undefined" ? param.iconSize : null}
                            iconColor={typeof param.iconColor !== "undefined" ? param.iconColor : null}
                            underlayColor={global.colors.LIGHT_GREY}
                            swipeableLeftOptions={null}
                            swipeableRightOptions={null}
                        >
                            {typeof param.icon !== "undefined" && typeof param.value === "undefined" ?
                                <Ionicons name={param.icon} size={typeof param.iconSize !== "undefined" ? param.iconSize : 30} color={param.iconColor !== null ? param.iconColor : global.colors.ANTHRACITE} />
                            :
                                null
                            }
                        </Cta>
                    </View>
                )}
            </View>
        );
    }

    return (
        typeof (swipeableRightOptions === "object" && swipeableRightOptions !== null) || (swipeableLeftOptions === "object" && swipeableLeftOptions !== null)
        ?
            <Swipeable 
                renderRightActions={swipeableRightOptions !== null ? (progress, dragX) => swipeableMenu(progress, dragX, "right") : null}
                renderLeftActions={swipeableLeftOptions !== null ? (progress, dragX) => swipeableMenu(progress, dragX, "left") : null}
            >
                {ctaRender()}
            </Swipeable>
        :
            ctaRender()
    );
}
