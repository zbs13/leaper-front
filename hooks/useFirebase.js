import { useContext } from "react";
import FirebaseContext from "../context/firebaseContext";
import {} from '../context/actions/firebase';
import { ext, blobFromUri, urlNoParams, getExactFileNameFromPath } from '../utils/utils';
import global from '../providers/global';

const useFirebase = () => {
  const { fb } = useContext(FirebaseContext);
  const { firestore, firestoreAsObf, storage } = fb;

  const actions = {
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
            .orderBy("createdAt", "desc")
            .limit(global.MAX_RESULT_PER_LOADED_TCHAT)
            .onSnapshot(documentSnapshot => {
                callback(documentSnapshot);
            });
    },
    /**
     * 
     * @param {string} id group/event id 
     * @param {object} user user who post the message (connected user id)
     * @param {string} textValue message text
     * @param {object} attachment attachment object
     * @param {function} callbackError callback if post message failed
     */
    postMessage: (id, user, textValue, attachment, callbackError) => {
        function postMessageDatas(attachmentUrl = null){
            actions.getUserProfilePic(user.id).then(function(profilePicUrl){
                firestore.collection(id).add({
                    content: textValue,
                    attachment: attachmentUrl,
                    sentBy: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        profilePic: profilePicUrl
                    },
                    createdAt: new Date(firestoreAsObf.Timestamp.now().seconds * 1000)
                })
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
                const createdAt = Date.now().toString();
                const ref = storage.ref(`${id}/shared/${createdAt}-${getExactFileNameFromPath(attachment.uri)}`);
                const task = ref.put(blob, metadata);
                task.on('state_changed',
                    function progress (snapshot) {},
                    function error () {
                        callbackError();
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
    },
    /**
     * delete a message
     * 
     * @param {string} geId group/event id
     * @param {object} message message to delete
     * @param {function} callbackError callback when delete message failed
     */
    deleteMessage: (geId, message, callbackError) => {
        firestore.collection(geId).doc(message.id).delete().then(function(){
            if(message.attachment !== null){
                fetch(urlNoParams(message.attachment.downloadUrl)).then((data) => data.json()).then(function(result){
                    storage.ref().child(result.name).delete().then(function(){}).catch(function(){
                        callbackError();
                    });
                })
            }
        }).catch(function(){
            callbackError();
        });
    },
    /**
     * get old messages
     * 
     * @param {string} geId group/event id
     * @param {*} offset search offset
     * @param {*} callback callback when old messages getted
     */
    getOldMessages: (geId, offset, callback) => {
        firestore
            .collection(geId)
            .orderBy("createdAt", "desc")
            .get()
            .then(result => {
                firestore
                    .collection(geId)
                    .orderBy("createdAt", "desc")
                    .startAfter(result.docs[offset - 1])
                    .limit(global.MAX_RESULT_PER_LOADED_TCHAT)
                    .get()
                    .then(result => {
                        callback(result);
                    })
            })
    }
  };

  return { actions };
};

export default useFirebase;
