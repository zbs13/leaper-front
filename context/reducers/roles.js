export const initialState = {
    needReload: false
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_NEED_RELOAD":
        return {
          ...state,
          needReload: action.payload
        }
      default:
        return state;
    }
  };
  