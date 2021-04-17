export const initialState = {
    my_groups: [],
    nbFetchedMy: 0,
    fetchedById: {},
    messages: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MY_GROUPS":
        let val = action.payload;
        // if(action.offset !== 0)
        //   val = state.my_groups.push(val)
        return {
            ...state,
            my_groups: val
        };
      case "UPDATE_GROUPS_BY_ID":
        return {
          ...state,
          fetchedById: action.payload
        }
      case "UPDATE_GROUPS_MESSAGES":
        let _val = action.payload;
        // if(action.offset !== 0)
        //   _val = state.messages.push(_val)
        return {
          ...state,
          messages: _val
        };
      default:
        return state;
    }
  };
  