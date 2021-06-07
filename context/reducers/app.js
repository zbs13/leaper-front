import { Platform } from 'react-native';

export const initialState = {
    lang: "fr",
    searchBar: null,
    os: Platform.OS,
    popupsStatus: [],
    addModal: {
      isOpen: false,
      navigation: null
    }
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
      default:
        return state;
    }
  };
  