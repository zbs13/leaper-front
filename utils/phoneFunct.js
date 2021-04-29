import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ext, randId } from '../utils/utils';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

/**
 * pick image/video in phone gallery
 * 
 * @param {function} onSuccessCallback function called if success
 * @param {function} onNotGrantedCallback function called if access gallery not granted
 * @returns 
 */
export async function pickMedia(onSuccessCallback, onNotGrantedCallback){
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        onNotGrantedCallback()
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.cancelled) {
        console.log(result)
        onSuccessCallback(result)
    }

    return;
};

/**
 * pick document from phone
 * 
 * @param {function} onSuccessCallback function called if success
 * @param {function} onFailCallback function called if failed
 * @returns 
 */
 export async function pickDocument(onSuccessCallback, onFailCallback){
    let result = await DocumentPicker.getDocumentAsync({type: "application/*"});
    switch(result.type){
        case "success":
            console.log(result);
            let extension = ext(result.uri);
            result = {
                ...result,
                type: extension
            }
            console.log(result);
            onSuccessCallback(result);
            return;
        case "cancel":
            return
        default:
            onFailCallback();
    }
};

/**
 * save a file to phone storage
 * 
 * @param {string} uri uri of file to save
 * @param {function} onError call if save failed
 */
export async function saveFileOnPhone(uri, onError){
    let filename = `file_${randId()}.${ext(uri)}`;
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    let downloadObject = FileSystem.createDownloadResumable(
        uri,
        fileUri
    );
    const dlFile = await downloadObject.downloadAsync();
    if (dlFile.status != 200) {
        onError();
    }else{
        // if image or video => save to phone library // different parameters according to os
        if(Platform.OS === "ios"){
            if(dlFile.mimeType.startsWith("image") || dlFile.mimeType.startsWith("video")){
                MediaLibrary.saveToLibraryAsync(dlFile.uri);
            }
        }else{
            if(dlFile.headers["content-type"].startsWith("image") || dlFile.headers["content-type"].startsWith("video")){
                MediaLibrary.saveToLibraryAsync(dlFile.uri);
            }
        }
    }
}