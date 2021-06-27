import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { convertBytesToKBytes } from '../../utils/utils';
import { video, image } from '../../assets/styles/styles';
import { Video } from 'expo-av';
import BackgroundImage from '../BackgroundImage';
import Txt from '../Txt';
import Cta from '../cta/Cta';
import OptionsModal from '../modals/OptionsModal';
import * as WebBrowser from 'expo-web-browser';
import FullscreenDisplay from './FullscreenDisplay';
import { getTypeFromContentType, getExactFileNameFromPath } from '../../utils/utils';

/**
 * display any media => file (pdf, doc...), any media => video, image
 * 
 * @param {object} file file parameters => uri, size, name, type
 * @param {boolean} isPreview is displayed as a preview or not 
 * @param {object|null} options file options 
 * @returns 
 */
export default function FileDisplay({file, isPreview = false, options = null}){

    const [fileState, setFileState] = useState({
        isImageLoading: true,
        isImageError: false,
        isFullScreen: false
    })

    function display(){
        return (
            <Cta onPress={async () => {
                if(!isPreview){
                    if(file.type !== undefined ? file.type === "video" : (file.contentType).includes("video")){
                        return {};
                    }else if(file.type !== undefined ? file.type === "image" : (file.contentType).includes("image")){
                        setFileState({
                            ...fileState,
                            isFullScreen: true
                        })
                    }else{
                        await WebBrowser.openBrowserAsync(file.downloadUrl);
                    }
                }else{
                    return {};
                }
            }}>
                {(file.type !== undefined ? file.type === "video" : (file.contentType).includes("video")) ?
                    <Video
                        style={isPreview ? video.containerPreview : video.container}
                        source={{
                            uri: file.downloadUrl || file.uri,
                        }}
                        useNativeControls
                        resizeMode="contain"
                    />
                :
                (file.type !== undefined ? file.type === "image" : (file.contentType).includes("image")) ?
                        <View>
                            <FullscreenDisplay 
                                isFullScreen={fileState.isFullScreen} 
                                onClose={() => setFileState({...fileState, isFullScreen: false})}
                                file={file.downloadUrl || file.uri}
                            >
                                <Image
                                    style={isPreview ? image.containerPreview : image.container}
                                    source={{
                                        uri: file.downloadUrl || file.uri
                                    }}
                                    resizeMode="contain"
                                    onError={() => setFileState({...fileState, isImageError: true, isImageLoading: false})}
                                    onLoadEnd={() => setFileState({...fileState, isImageLoading: false})}
                                />
                            </FullscreenDisplay>
                            <ActivityIndicator
                                style={styles.activityIndicator}
                                animating={fileState.isImageLoading}
                            />
                        </View>
                    :
                        <View style={[globalStyles.flexRow, globalStyles.alignCenter, globalStyles.p_5]}>
                            <View style={{width: 50, height: 70}}>
                                <BackgroundImage
                                    image={require("../../assets/img/icons/file-icon.png")}
                                    resizeMode="contain"
                                >
                                    <Txt _style={[globalStyles.ta_c, globalStyles.c_anth]}>{file.type !== undefined ? file.type : getTypeFromContentType(file.contentType)}</Txt>
                                </BackgroundImage>
                            </View>
                            <View>
                                <Txt ellipsis={25} _style={globalStyles.c_anth}>{getExactFileNameFromPath(file.name)}</Txt>
                            </View>
                            <View style={globalStyles.separator} />
                            <View>
                                <Txt ellipsis={25} _style={globalStyles.c_anth}>{convertBytesToKBytes(file.size)} kB</Txt>
                            </View>
                        </View>
                }
            </Cta>
        )
    }

    return (
        options !== null ?
            <OptionsModal
                isActive={!isPreview}
                {...options}
            >
                {display()}
            </OptionsModal>
        :
            display()
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
  })