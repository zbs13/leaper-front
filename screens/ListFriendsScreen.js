import React from 'react';
import { View } from 'react-native';
import Txt from '../components/Txt';

/**
 * friends list screen
 * @returns 
 */
export default function ListFriendsScreen() {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Txt>Liste groupe d'amis</Txt>
        </View>
    );
  };

