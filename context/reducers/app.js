import { Platform } from 'react-native';

export const initialState = {
    lang: {
      lang: 'en', 
      flag: 'GB'
    },
    searchBar: null,
    os: Platform.OS,
    isFirstLaunch: true,
    popupsStatus: [],
    addModal: {
      isOpen: false,
      navigation: null
    },
    notifications: [],
    waitingNotifications: [],
    isConnected: false
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_USER_PARAMETERS":
        return {
          ...state,
          ...action.payload
        };
      case "ADD_POPUP_STATUS":
        state.popupsStatus.push(action.payload);
        return state;
      case "REMOVE_POPUP_STATUS":
        state.popupsStatus.map((popup, index) => {
          if(popup.id == action.payload){
            state.popupsStatus.splice(index, 1);
          }
        })
        return state;
      case "TOGGLE_ADD_MODAL":
        return {
          ...state,
          addModal: {
            isOpen: !state.addModal.isOpen,
            navigation: action.payload
          }
        }
      case "TOGGLE_SEARCH_BAR":
        return {
          ...state,
          searchBar: action.payload
        }
      case "SET_NOTIFS":
        return {
          ...state,
          notifications: action.payload
        }
      case "SET_WAITING_NOTIFS":
        return {
          ...state,
          waitingNotifications: action.payload
        }
      case "UPDATE_IS_CONNECTED":
        return {
            ...state,
            isConnected: action.payload
        }
      default:
        return state;
    }
  };
  