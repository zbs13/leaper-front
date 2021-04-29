import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { convertBytesToKBytes } from '../../utils/utils';
import { video, image } from '../../assets/styles/styles';
import { Video } from 'expo-av';
import BackgroundImage from '../BackgroundImage';
import Txt from '../Txt';

/**
 * display any media => file (pdf, doc...), any media => video, image
 * 
 * @param {object} file file parameters => uri, size, name, type
 * @param {boolean} isPreview is displayed as a preview or not 
 * @returns 
 */
export default function FileDisplay({file, isPreview = false}){

    const [fileState, setFileState] = useState({
        isImageLoading: true,
        isImageError: false
    })

    return (
        <>
            {file.type === "video" ?
                <Video
                    style={video.container}
                    source={{
                        uri: file.uri,
                    }}
                    useNativeControls
                    resizeMode="contain"
                />
            :
            file.type === "image" ?
                    <View>
                        <Image
                            style={image.container}
                            source={{
                                uri: file.uri
                            }}
                            resizeMode="contain"
                            onError={() => setFileState({...fileState, isImageError: true, isImageLoading: false})}
                            onLoadEnd={() => setFileState({...fileState, isImageLoading: false})}
                        />
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
                                <Txt _style={[globalStyles.ta_c, globalStyles.c_anth]}>{file.type}</Txt>
                            </BackgroundImage>
                        </View>
                        <View>
                            <Txt ellipsis={25} _style={globalStyles.c_anth}>{file.name}</Txt>
                        </View>
                        <View style={globalStyles.separator} />
                        <View>
                            <Txt ellipsis={25} _style={globalStyles.c_anth}>{convertBytesToKBytes(file.size)} kB</Txt>
                        </View>
                    </View>
            }
        </>
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