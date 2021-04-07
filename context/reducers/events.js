export const initialState = {
    my_events: [],
    fetchedByCriteria: [],
    nbFetchedByCriteria: 0
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
      case "UPDATE_EVENTS_BY_CRITERIA":
        return {
          ...state,
          fetchedByCriteria: action.payload
        }
      default:
        return state;
    }
  };
  