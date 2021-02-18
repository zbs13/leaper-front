import React from 'react';
import { ImageBackground } from 'react-native';

export default function BackgroundImage({_style, image, children}) {
    return (
        <ImageBackground
            source={image} 
            style={{width: '100%', height: '100%'}} 
            resizeMode='cover'
            imageStyle={_style} >
                {children}
        </ImageBackground>
  );
}
