import React from 'react';
import { Text } from 'react-native';
import { pageTitle } from '../assets/styles/styles';

export default function Title({children}) {

    return (
        <Text style={pageTitle.main}>
            {children}
        </Text>
    );
}
