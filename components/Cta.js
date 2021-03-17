import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import BackgroundImage from './BackgroundImage';
import globalStyles from '../assets/styles/global';

export default function Cta({_style, onPress, underlayColor, value, backgroundImage, children}) {

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
                onPress={onPress} 
                underlayColor={typeof underlayColor === "undefined" ? "transparent" : underlayColor}>
                    <View>
                        {typeof value === "string" ?
                            <Text style={color}>{value}</Text>
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
        </View>
  );
}
