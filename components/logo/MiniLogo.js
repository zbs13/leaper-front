import React from 'react';
import { Image } from 'react-native';

export default function MiniLogo({_style}) {
    return (
        <Image style={_style} source={require('../../assets/img/logos/Mini_Leaper_Logo.png')} resizeMode='contain' />
    )
}
