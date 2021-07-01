import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Txt from './Txt';
import globalStyles from '../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../providers/global';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

/**
 * camera component
 * 
 * @param {boolean} isVisible is camera visible
 * @param {function} onTakePicture function called when picture took
 * @param {function} onClose function called when camera closed 
 * @returns 
 */
export default function Cam({isVisible, onTakePicture, onClose}) {

    const {selectors} = useApp();

    const [hasPermission, setHasPermission] = useState(null);
    const [flash, setFlash] = useState("off");
    const [type, setType] = useState(Camera.Constants.Type.back);

    let camera;

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            (async () => {
                const { status } = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }
        return () => {isMounted = false};
    }, []);

    if (hasPermission === null) {
        onClose();
        return <></>;
    }
    if (hasPermission === false) {
        onClose();
        return <></>;
    }

    async function takePicture(){
        if(!camera) return;
        let picture = await camera.takePictureAsync();
        onClose();
        onTakePicture({
            uri: picture.uri,
            type: "image"
        });
    }

    return (
        isVisible ?
            <View style={[{flex: 1, position: "absolute", top: 0, left: 0}, globalStyles.w_100, globalStyles.h_100]}>
                <Camera 
                    style={{flex: 1}} 
                    type={type} 
                    ref={(r) => {camera = r}}
                    flashMode={flash}
                >
                    <View style={[globalStyles.flexRow, {flex: 1}, globalStyles.alignEnd, globalStyles.m_5]}>
                        <View style={[{flex: 1, height: 75}, globalStyles.flexColumn]}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    setFlash(flash === "on" ? "off" : "on");
                                }}>
                                <Ionicons name={flash === "on" ? "flash" : "flash-outline"} color={global.colors.WHITE} size={35}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                }}>
                                <Ionicons name="repeat-outline" color={global.colors.WHITE} size={35}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[{flex: 1}, globalStyles.alignCenter, globalStyles.justifyCenter]}
                            onPress={() => {
                                takePicture();
                            }}>
                            <Ionicons name="camera-outline" color={global.colors.WHITE} size={50}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{flex: 1}, globalStyles.alignCenter, globalStyles.justifyEnd, globalStyles.p_5]}
                            onPress={() => {
                                onClose();
                            }}>
                            <Txt _style={{color: global.colors.WHITE, fontSize: 20}}>
                                {t(selectors.getLang()).CANCEL}
                            </Txt>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        :
            <></>
    );
}