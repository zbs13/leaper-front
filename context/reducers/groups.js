export const initialState = {
    my_groups: [],
    nbFetchedMy: 0,
    fetchedById: {}
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
      case "UPDATE_GROUPS_BY_ID":
        return {
          ...state,
          fetchedById: action.payload
        }
      default:
        return state;
    }
  };
  