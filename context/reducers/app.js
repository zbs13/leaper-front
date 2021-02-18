export const initialState = {
    lang: "fr"    
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
      default:
        return state;
    }
  };
  