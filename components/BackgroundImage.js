import React from 'react';
import { ImageBackground } from 'react-native';

/**
 * background image
 * 
 * @param {object} _style style 
 * @param {function|object} image {uri: ...} OR require(...)
 * @param {object} children child component
 * @param {boolean} isRound is image rounded
 * @param {string|null} resizeMode resize mode => cover, contain...
 * @returns 
 */
export default function BackgroundImage({_style, image, children, isRound = false, resizeMode = null}) {
    return (
        <ImageBackground
            source={image} 
            style={{width: '100%', height: '100%', justifyContent: "center"}} 
            resizeMode={resizeMode !== null ? resizeMode : 'cover'}
            imageStyle={isRound ? {borderRadius: 100, ..._style} : _style} >
                {children}
        </ImageBackground>
  );
}
