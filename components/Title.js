import React from 'react';
import { Text, View } from 'react-native';
import { pageTitle } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';

/**
 * UI titles
 * 
 * @param {component} children children component
 * @param {string} type title type => "first", "second", or "third"
 * @returns 
 */
export default function Title({children, type = null}) {

    return (
        <View style={[globalStyles.flexColumn, globalStyles.w_100, globalStyles.mb_10]}>
            <Text style={type === "second" ? pageTitle.second : type === "third" ? pageTitle.third : pageTitle.main}>
                {children}
            </Text>
            {type === null || type === "first" ?
                <View style={{height: 5, width: "40%", backgroundColor: global.colors.MAIN_COLOR, borderRadius: 50}}></View>
            :
                null
            }
        </View>
    );
}
