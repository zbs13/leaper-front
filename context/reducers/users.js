export const initialState = {
    user: {},
    isConnected: false,
    connectedUser: {},
    connectedUserProfilePic: null
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload
            }
        case "UPDATE_CONNECTED_USER":
            return {
                ...state,
                connectedUser: action.payload
            }
        case "UPDATE_CONNECTED_USER_INFOS":
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    ...action.payload
                }
            }
        case "UPDATE_CONNECTED_USER_PROFILE_PIC":
            return {
                ...state,
                connectedUserProfilePic: action.payload
            }
        case "UPDATE":
            return {
                ...state,
                ...action.payload
            }
        case "UPDATE_IS_CONNECTED":
            return {
                ...state,
                isConnected: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                isConnected: false,
            }
        case "UPDATE_BOOKMARKS":
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    bookmarks: action.payload
                }
            }
        case "UPDATE_FRIENDS":
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    friends: action.payload
                }
            }
        case "UPDATE_GROUPS":
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    groups: action.payload
                }
            }
        case "UPDATE_EVENTS":
            return {
                ...state,
                connectedUser: {
                    ...state.connectedUser,
                    events: action.payload
                }
            }
        default:
            return state;
    }
  };
  