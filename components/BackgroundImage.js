import React from 'react';
import { ImageBackground } from 'react-native';

/**
 * background image
 * 
 * @param {object} _style style 
 * @param {function|object} image {uri: ...} OR require(...)
 * @returns 
 */
export default function BackgroundImage({_style, image, children, resizeMode = null}) {
    return (
        <ImageBackground
            source={image} 
            style={{width: '100%', height: '100%', justifyContent: "center"}} 
            resizeMode={resizeMode !== null ? resizeMode : 'cover'}
            imageStyle={_style} >
                {children}
        </ImageBackground>
  );
}
