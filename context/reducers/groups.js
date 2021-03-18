export const initialState = {
    groups: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_GROUPS":
        return {
            ...state,
            groups: action.payload
        };
      default:
        return state;
    }
  };
  