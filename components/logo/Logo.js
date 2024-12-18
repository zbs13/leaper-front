import React from 'react';
import { Image } from 'react-native';

/**
 * logo
 * 
 * @param {object} _style style 
 * @returns 
 */
export default function Logo({_style}) {
    return (
        <Image style={_style} source={require('../../assets/img/logos/Full_Leaper_Logo_Small.png')} resizeMode='contain' />
    )
}
