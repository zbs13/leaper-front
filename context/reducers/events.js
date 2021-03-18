export const initialState = {
    my_events: [],
    events: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MY_EVENTS":
        return {
            ...state,
            my_events: action.payload
        };
      default:
        return state;
    }
  };
  