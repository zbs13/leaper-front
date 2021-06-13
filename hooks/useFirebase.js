import { useContext } from "react";
import FirebaseContext from "../context/firebaseContext";
import {} from '../context/actions/firebase';

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
    }
  };

  return { actions };
};

export default useFirebase;
