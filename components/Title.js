import React from 'react';
import { Text } from 'react-native';
import { pageTitle } from '../assets/styles/styles';

export default function Title({children, type}) {

    return (
        <Text style={type === "second" ? pageTitle.second : pageTitle.main}>
            {children}
        </Text>
    );
}
