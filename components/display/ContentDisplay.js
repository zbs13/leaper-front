import React from 'react';
import { View } from 'react-native';
import Txt from '../Txt';
import { isUri, randId } from '../../utils/utils';
import * as WebBrowser from 'expo-web-browser';
import { uri } from '../../assets/styles/styles';

/**
 * display to right format according to string content => ex: if content contains uri format so interpret it as a link
 * 
 * @param {string} content text content
 * @returns 
 */
export default function ContentDisplay({content}){

    let contentParts = content.split(" ");

    const openWebBrowser = async (uri) => {
        await WebBrowser.openBrowserAsync(uri);
    };

    return (
        <View>
            <Txt>
                {
                    contentParts.map((value, index) => {
                        return value;
                    }).reduce((accu, elem) => {
                        if(isUri(elem)){
                            return accu === null ? [elem] : [...accu, ' ', <Txt key={randId()} _style={uri.main} onPress={() => openWebBrowser(elem)}>{elem}</Txt>]
                        }
                        return accu === null ? [elem] : [...accu, ' ', elem]
                    }, null)
                }
            </Txt>
        </View>
    )
}