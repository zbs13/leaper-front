import { useContext } from "react";
import AppContext from "../context/appContext";
import { fetchGlobal } from '../context/actions/app';
import { randId } from '../utils/utils';
import { response } from '../context/actions/apiCall';

const useApp = () => {
  const {
    state: { app: appState },
    dispatch,
  } = useContext(AppContext);

  const actions = {
    /**
     * update user parameters
     * 
     * @param {object} datas parameters to update
     */
    updateUserParameters: function (datas) {
      dispatch({
        type: "UPDATE_USER_PARAMETERS",
        payload: datas
      })
    },
    /**
     * update user connection status
     * 
     * @param {boolean} isConnected is user connected
     */
    updateIsConnected: function(isConnected){
      dispatch({
        type: "UPDATE_IS_CONNECTED",
        payload: isConnected,
      });
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
    /**
     * remove popup
     * 
     * @param {string} id popup id to remove
     */
    removePopupStatus: function(id) {
      dispatch({
        type: "REMOVE_POPUP_STATUS",
        payload: id
      })
    },
    /**
     * toggle add modal
     * 
     * @param {object} navigation 
     */
    toggleAddModal: function(navigation = null) {
      dispatch({
        type: "TOGGLE_ADD_MODAL",
        payload: navigation
      })
    },
    /**
     * toggle search bar
     * 
     * @param {string} type search bar type => global
     */
    toggleSearchBar: function(type){
      dispatch({
        type: "TOGGLE_SEARCH_BAR",
        payload: type
      })
    },
    /**
     * set user notifs
     * 
     * @param {object} notifs user notifs
     */
    setNotifs: function(notifs){
      dispatch({
        type: "SET_NOTIFS",
        payload: notifs
      })
    },
    /**
     * set user waiting notifs
     * 
     * @param {object} notifs user waiting notifs
     */
     setWaitingNotifs: function(waitingNotifs){
      dispatch({
        type: "SET_WAITING_NOTIFS",
        payload: waitingNotifs
      })
    },
    /**
     * fetch global
     * 
     * @param {object} search search value
     * @param {number} offsetEvents offset events for search
     * @param {number} offsetGroups offset groups for search
     * @returns 
     */
    fetchGlobal: function(search, offsetEvents, offsetGroups) {
      return fetchGlobal(search, offsetEvents, offsetGroups).then((data) => {
        return response(data);
      });
    }
  };

  const selectors = {
    getLang: () => appState.lang.lang,
    getCountry: () => appState.lang.flag,
    getSearchBar: () => appState.searchBar,
    getOS: () => appState.os,
    getPopupsStatus: () => appState.popupsStatus,
    getAddModal: () => appState.addModal,
    isFirstLaunch: () => appState.isFirstLaunch,
    isConnected: () => appState.isConnected,
    getNotifs: () => appState.notifications,
    getWaitingNotifs: () => appState.waitingNotifications
  };

  return { selectors, actions };
};

export default useApp;
