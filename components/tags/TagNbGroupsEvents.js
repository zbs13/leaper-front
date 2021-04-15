import React from 'react';
import { View, Text } from 'react-native';
import { tag } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';

/**
 * tag nb groups/events
 * 
 * @param {object} children for routing 
 * @returns 
 */
export default function TagNbGroupsEvents({children}) {
    return (
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, tag.container, tag.groupsEvents]}>
            <Text style={tag.groupsEventsText} >{children}</Text>
        </View>
    );
}
