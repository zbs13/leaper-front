export const initialState = {
    user: {},
    connectUser: {}
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
        default:
            return state;
    }
  };
  