import { useContext } from "react";
import AppContext from "../context/appContext";
import { fetchUserParameters, updateUserParameters } from '../context/actions/app';
import { randId } from '../utils/utils';

const useApp = () => {
  const {
    state: { app: appState },
    dispatch,
  } = useContext(AppContext);

  const actions = {
    /**
     * fetch user parameters
     * 
     * @returns 
     */
    fetchUserParameters: function () {
      return fetchUserParameters().then((data) => {
        // dispatch({
        //   type: "UPDATE_USER_PARAMETERS",
        //   payload: data
        // });
        return [data]
      });
    //   dispatch({
    //     type: "UPDATE_USER_PARAMETERS",
    //     payload: datas
    // })
    },
    /**
     * update user parameters
     * 
     * @param {object} datas parameters to update
     */
    updateUserParameters: function (datas) {
    //     updateUserParameters(datas).then((data) =>
    //         dispatch({
    //         type: "UPDATE_USER_PARAMETERS",
    //         payload: data
    //     })
    //   );
      dispatch({
        type: "UPDATE_USER_PARAMETERS",
        payload: datas
      })
    },
    /**
     * create an app status popup => error, success, info 
     * 
     * @param {string} type popup type => error, success, info
     * @param {string} message message to display in popup
     */
    addPopupStatus: function({type, message}) {
      let id = randId();
      dispatch({
        type: "ADD_POPUP_STATUS",
        payload: {
          id: id,
          type: type,
          message: message
        }
      })

      new Promise(function(resolve) {
        setTimeout(function(){
          resolve("removePopupStatus");
        }, 2000);
      }).then(function(removePopupFunc){
        actions[removePopupFunc](id);
      });
    },
    removePopupStatus: function(id) {
      dispatch({
        type: "REMOVE_POPUP_STATUS",
        payload: id
      })
    }
  };

  const selectors = {
    getUserParameters: () => appState,
    getLang: () => appState.lang,
    getSearchBar: () => appState.searchBar,
    getOS: () => appState.os,
    getPopupsStatus: () => appState.popupsStatus
  };

  return { selectors, actions };
};

export default useApp;
