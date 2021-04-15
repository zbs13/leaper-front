import React from 'react';
import { View } from 'react-native';
import BackgroundImage from "../BackgroundImage";

/**
 * icon with background image
 * 
 * @param {string} src image source
 * @param {object|null} _style style
 * @returns 
 */
export default function ImageIcon({src, _style = null}) {

    return (
        <View style={_style !== null ? _style : {width: 25, height: 25, margin: 2}}>
            <BackgroundImage _style={{borderRadius: 50}} image={{uri: src}} />
        </View>
    );
}
