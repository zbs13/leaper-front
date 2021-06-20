import { useContext } from "react";
import FirebaseContext from "../context/firebaseContext";
import {} from '../context/actions/firebase';
import { ext, blobFromUri } from '../utils/utils';

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
     */
    putUserProfilePic: async(userId, uri) => {
        let _ext = ext(uri);
        blobFromUri(uri, function(blob){
            let metadata = {
                contentType: `image/${_ext}`,
            };
            const ref = storage.ref().child(`${userId}/profilePic.${_ext}`)
            ref.put(blob, metadata);
        })
    }
  };

  return { actions };
};

export default useFirebase;
