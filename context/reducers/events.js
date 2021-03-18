export const initialState = {
    events: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_EVENTS":
        return {
            ...state,
            events: action.payload
        };
      default:
        return state;
    }
  };
  