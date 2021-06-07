export const initialState = {
    user: {},
    isConnected: false,
    connectedUser: {}
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
        default:
            return state;
    }
  };
  