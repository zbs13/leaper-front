import React from 'react';
import { Image, Text, View, TouchableHighlight } from 'react-native';

export default function Cta({_style, onPress, underlayColor, value, backgroundImage}) {
    console.log(_style);
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
                                <Image source={backgroundImage} />
                            :
                                value

                        }
                    </View>
            </TouchableHighlight>
        </View>
  );
}
