import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ext } from '../utils/utils';

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