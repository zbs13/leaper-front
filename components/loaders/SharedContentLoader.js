import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';

/**
 * shared content screen loader
 * 
 * @returns 
 */
export default function SharedContentLoader() {
    return (
        <View style={globalStyles.w_100}>
            <Placeholder
                Animation={Fade}
            >
                <View style={globalStyles.m_5}>
                    <PlaceholderMedia size={"100%"}/>
                </View>
            </Placeholder>
        </View>
    );
}