import React from 'react';
import { View } from 'react-native';
import BackgroundImage from "../BackgroundImage";

export default function ImageIcon({src}) {

    return (
        <View style={{width: 25, height: 25, margin: 2}}>
            <BackgroundImage _style={{borderRadius: 50}} image={{uri: src}} />
        </View>
    );
}
