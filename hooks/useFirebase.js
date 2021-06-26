import { useContext } from "react";
import FirebaseContext from "../context/firebaseContext";
import {} from '../context/actions/firebase';
import { ext, blobFromUri, urlNoParams, getExactFileNameFromPath } from '../utils/utils';

const useFirebase = () => {
  const { fb } = useContext(FirebaseContext);
  const { firestore, firestoreAsObf, storage } = fb;

  const actions = {
    /**
     * get element url from firebase storage
     * 
     * @param {string} elementId element id to get 
     */
    // getElementURLFromStorage: (elementId) => {
    //     let element = storage.ref(elementId);
    //     element.getDownloadURL().then(url => {
    //         console.log(url);
    //     }).catch(function(error){
    //         console.log(error)
    //     })
    // },
    /**
     * get user profile pic
     * 
     * @param {string} userId user id
     */
     getUserProfilePic: (userId) => {
        let element = storage.ref(userId);
        return element.listAll().then(function(result){
            return result.items[0].getDownloadURL().then(function(url){
                return url;
            }).catch(function(){
                return null;
            })
        }).catch(function(){
            return null;
        });
    },
    /**
     * edit/put user profile pic
     * 
     * @param {string} userId user id 
     * @param {string} uri image uri
     * @param {function|null} callback called when user profile pic inserted in firebase
     */
    putUserProfilePic: async(userId, uri, callback = null) => {
        let _ext = ext(uri);
        blobFromUri(uri, async function(blob){
            let metadata = {
                contentType: `image/${_ext}`,
            };
            const ref = storage.ref().child(`${userId}/profilePic.${_ext}`)
            await ref.put(blob, metadata);
            if(callback !== null){
                callback()
            }
        })
    },
    /**
     * put group/event logo
     * 
     * @param {string} geId group/event id
     * @param {string} url logo url
     */
    putGELogo: (geId, url) => {
        let _ext = ext(url);
        blobFromUri(url, async function(blob){
            let metadata = {
                contentType: `image/${_ext}`,
            };
            const ref = storage.ref().child(`${geId}/logo/logo.${_ext}`)
            ref.put(blob, metadata);
        })
    },
    /**
     * get group/event logo url
     * 
     * @param {string} geId group/event id
     */
    getGELogo: (geId) => {
        let element = storage.ref(`${geId}/logo`);
        return element.listAll().then(function(result){
            return result.items[0].getDownloadURL().then(function(url){
                return url;
            }).catch(function(){
                return null;
            })
        }).catch(function(){
            return null;
        });
    },
    /**
     * get shared content
     * 
     * @param {string} geId group/event id
     * @param {number} limit results limit to fetch
     * @param {function} callback return function
     */
     getSharedContent: (geId, limit, callback) => {
        let element = storage.ref(`${geId}/shared`);
        element.list({maxResults: limit}).then(function(result){
            result.items.map(res => {
                res.getDownloadURL().then(function(url){
                    let urlMetadatas = urlNoParams(url);
                    fetch(urlMetadatas).then((result) => 
                        result.json()
                    ).then((res) => {
                        callback({
                            ...res,
                            downloadUrl: url
                        })
                    })
                }).catch(function(){
                    callback(null);
                })
            })
            callback(null);
        }).catch(function(){
            callback(null);
        });
    },
    /**
     * get last messages in real time
     * 
     * @param {string} id group/event id 
     */
     lastMessagesSnapshot: (id, callback) => {
        return firestore
            .collection(id)
            .orderBy("createdAt", "asc")
            .limit(50)
            .onSnapshot(documentSnapshot => {
                callback(documentSnapshot);
            });
    },
    /**
     * 
     * @param {string} id group/event id 
     * @param {object} user user who post the message (connected user id)
     * @param {string} textValue message text
     * @param {object} attachment attchment object
     */
    postMessage: (id, user, textValue, attachment) => {
        function postMessageDatas(attachmentUrl = null){
            firestore.collection(id).add({
                content: textValue,
                attachment: attachmentUrl,
                sentBy: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                createdAt: new Date(firestoreAsObf.Timestamp.now().seconds * 1000)
            })
        }
        if(Object.keys(attachment).length !== 0){
            let _ext = ext(attachment.uri);
            blobFromUri(attachment.uri, async function(blob){
                let type = "application";
                switch(attachment.type){
                    case "image":
                        type = "image";
                        break;
                    case "video":
                        type = "video";
                        break;
                    default:
                        type = "application";
                }
                let metadata = {
                    contentType: `${type}/${_ext}`
                };
                const ref = storage.ref(`${id}/shared/${Date.now().toString()}-${getExactFileNameFromPath(attachment.uri)}`);
                const task = ref.put(blob, metadata);
                task.on('state_changed',
                    function progress (snapshot) {
                        
                    },
                    function error () {
                        
                    },
                    function complete (event) {
                        ref.getDownloadURL().then((url) => { 
                            postMessageDatas({
                                ...attachment,
                                downloadUrl: url
                            });
                        })
                    }
                )
            })
        }else{
            postMessageDatas();
        }
    }
  };

  return { actions };
};

export default useFirebase;
