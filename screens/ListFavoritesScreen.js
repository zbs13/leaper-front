import React from 'react';
import { View } from 'react-native';
import Txt from '../components/Txt';

/**
 * favorites list screen
 * @returns 
 */
export default function ListFavoritesScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Txt>Listes lieux favoris</Txt>
      </View>
    );
  }

