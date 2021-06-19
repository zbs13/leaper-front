import { useContext } from "react";
import { Platform } from 'react-native';
import FirebaseContext from "../context/firebaseContext";
import {} from '../context/actions/firebase';
import { ext } from '../utils/utils';

const useFirebase = () => {
  const { fb } = useContext(FirebaseContext);
  const { firestore, storage } = fb;

  const actions = {
      /**
       * get element url from firebase storage
       * 
       * @param {string} elementId element id to get 
       */
    getElementURLFromStorage: (elementId) => {
        let element = storage.ref(elementId);
        element.getDownloadURL().then(url => {
            console.log(url);
        }).catch(function(error){
            console.log(error)
        })
    },
    /**
     * edit/put user profile pic
     * 
     * @param {string} userId user id 
     * @param {string} uri image uri
     * @param {string} imgBase64 file in base64 
     */
    putUserProfilePic: (userId, uri, imgBase64) => {
        //console.log(`data:image/jpg;base64,${imgBase64}`);
        let _ext = ext(uri);
        var storageRef = storage.ref(`${userId}/profilePic`);
        storageRef.putString(`data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB`, 'data_url').then(function (snapshot) {
            console.log('Image is uploaded by base64 format...');
        });
    }
  };

  return { actions };
};

export default useFirebase;
