import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import BackgroundImage from './BackgroundImage';
import globalStyles from '../assets/styles/global';

export default function Cta({_style, onPress, underlayColor, value, backgroundImage}) {
    return (
        <View>
            <TouchableHighlight style={_style} 
                onPress={onPress} 
                underlayColor={typeof underlayColor === "undefined" ? "transparent" : underlayColor}>
                    <View>
                        {typeof value === "string" ?
                            <Text>{value}</Text>
                        : 
                            typeof backgroundImage !== "undefined" ?
                                <BackgroundImage
                                    image={backgroundImage} 
                                    _style={globalStyles.br_50}>
                                </BackgroundImage>
                            :
                                value

                        }
                    </View>
            </TouchableHighlight>
        </View>
  );
}
