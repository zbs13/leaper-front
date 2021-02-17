import React from 'react';
import { Image } from 'react-native';
import styles from '../../assets/styles/styles';

export default function HeaderLogo() {
    return (
        <Image style={styles.headerLogo} source={require('../../assets/img/logos/Full_Leaper_Logo_Small.png')} resizeMode='contain' />
    )
}
