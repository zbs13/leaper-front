import React from 'react';
import { View, Text } from 'react-native';
import { tag } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';

export default function TagNbNotifs({children}) {
    return (
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, tag.container, tag.notifs]}>
            <Text style={tag.notifsText}>
                {children > 9 ? "9+" : children}
            </Text>
        </View>
    );
}
