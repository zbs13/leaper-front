import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import BackgroundImage from '../BackgroundImage';
import globalStyles from '../../assets/styles/global';
import DialogPopup from '../DialogPopup';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';
import { cta } from '../../assets/styles/styles';
import Txt from '../Txt';
import { Tag } from 'react-native-btr';
import TagNbNotifs from '../tags/TagNbNotifs';

/**
 * all Cta management => usual cta or with swipeable options...
 * 
 * @param {object} _style _style for cta
 * @param {function} onPress function to call after pressing cta 
 * @param {function|null} onLongPress function to call after a long pressing on cta
 * @param {string|null} underlayColor background color while pressing cta 
 * @param {string} value value displayed on cta
 * @param {object|null} confirm object with paramters for confirm popup before calling onPress function => title, content
 * @param {object|function} backgroundImage background image for cta => {uri: ...} OR require(...)
 * @param {component|null} children children component 
 * @param {string} icon icon name 
 * @param {number} iconSize icon size
 * @param {string} iconColor icon color
 * @param {object} swipeableRightOptions right swipeable options for cta => style, action, value, confirm{title, content}, icon, iconSize, iconColor
 * @param {object} swipeableLeftOptions left swipeable options for cta => style, action, value, confirm{title, content}, icon, iconSize, iconColor
 * @param {boolean} disabled is cta disabled
 * @param {number} tag tag displaying number of notifications
 * @returns 
 */
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
    swipeableLeftOptions = null,
    disabled = false,
    tag = 0
}) {

    const [dialogVisible, setDialogVisible] = useState(false);

    let color = {color: global.colors.ANTHRACITE};
    let fontSize = {};
    let textAlign = {};
    /**
     * check if _style has :
     * - color => put color to text
     * - fontSize => put fontSize to text
     * - textAlign => put textAlign to text 
     * Necessary to put style attribute to good component
     */
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
        if(typeof _style.color !== "undefined"){
            color = {color: _style.color};
        }
        fontSize = typeof _style.fontSize !== "undefined" ? {fontSize: _style.fontSize} : {};
        textAlign = typeof _style.textAlign !== "undefined" ? {textAlign: _style.textAlign} : {};
    }

    /**
     * main Cta render
     * @returns 
     */
    function ctaRender(){
        return (
            <View>
                <Pressable style={Array.isArray(_style) ? [..._style, disabled ? {backgroundColor: global.colors.VERY_LIGHT_GREY} : {}] : [_style, disabled ? {backgroundColor: global.colors.VERY_LIGHT_GREY} : {}]} 
                    onPress={confirm !== null ? () => setDialogVisible(true) : onPress} 
                    // underlayColor={typeof underlayColor === "undefined" ? "transparent" : underlayColor}
                    onLongPress={onLongPress !== null ? onLongPress : null}
                    disabled={disabled}
                >
                    <View>
                        {typeof value === "string" ?
                            icon !== null ?
                                <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                    <Ionicons style={{marginRight: 5}} name={icon} size={iconSize !== null ? iconSize : 20} color={iconColor !== null ? iconColor : global.colors.ANTHRACITE} />
                                    <Txt _style={[color, fontSize, globalStyles.ta_c, textAlign]}>{value}</Txt>
                                </View>
                            :
                                tag !== 0 ?
                                    <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                        <View style={globalStyles.mr_5}>
                                            <TagNbNotifs size={12} padding={20}>
                                                {tag}
                                            </TagNbNotifs> 
                                        </View>
                                        <Txt _style={[color, fontSize, globalStyles.ta_c, textAlign]}>{value}</Txt>
                                    </View>
                                :
                                    <Txt _style={[color, fontSize, globalStyles.ta_c, textAlign]}>{value}</Txt>
                        : 
                            typeof backgroundImage !== "undefined" ?
                                <BackgroundImage
                                    image={backgroundImage} 
                                    _style={globalStyles.br_50}>
                                        {children === undefined ? null : children}
                                </BackgroundImage>
                            :
                                typeof children !== "undefined" ?
                                    tag !== 0 ?
                                        <View style={{position: "relative"}}>
                                            <View style={{position: "absolute", left: "50%", top: 2, zIndex: 10}}>
                                                <TagNbNotifs size={12} padding={20}>
                                                    {tag}
                                                </TagNbNotifs> 
                                            </View>
                                            {children}
                                        </View>
                                    :
                                        children
                                :
                                    value

                        }
                    </View>
                </Pressable>
                {confirm !== null ?
                    <DialogPopup 
                        dialogVisible={dialogVisible}
                        title={typeof confirm.title !== "undefined" ? confirm.title : null}
                        content={confirm.content}
                        onAcceptPress={() => {
                            setDialogVisible(false);
                            onPress();
                        }}
                        onCancelPress={() => setDialogVisible(false)}
                    />
                :
                    null
                }
            </View>
        )
    }

    /**
     * swipeable menu conf (call if swipeableLeftOptions or swipeableRightOptions are not null)
     * 
     * @param {number} progress 
     * @param {number} dragX 
     * @param {string} side if swipeableLeftOptions not null = "left" else if swipeableRightOptions not null = "right"
     * @returns 
     */
    function swipeableMenu(progress, dragX, side){
        let options = side === "left" ? swipeableLeftOptions : swipeableRightOptions
        let style = side === "left" ? {borderRightWidth: 1, borderRightColor: global.colors.LIGHT_MAIN_COLOR} : {borderLeftWidth: 1, borderLeftColor: global.colors.LIGHT_MAIN_COLOR}
        return (
            <View style={[globalStyles.flexRow, globalStyles.h_100]}>
                {options.map((param, idx) => 
                    <View key={idx}>
                        <Cta 
                            _style={[style, cta.first_nr, param.style, globalStyles.p_10, globalStyles.h_100, globalStyles.justifyCenter]} 
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
                                <Ionicons name={param.icon} size={typeof param.iconSize !== "undefined" ? param.iconSize : 30} color={typeof param.iconColor !== "undefined" ? param.iconColor : global.colors.ANTHRACITE} />
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
