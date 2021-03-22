export const initialState = {
    my_groups: [],
    groups: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MY_GROUPS":
        return {
            ...state,
            my_groups: action.payload
        };
      default:
        return state;
    }
  };
  