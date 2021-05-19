export const initialState = {
    my_events: [],
    fetchedByCriteria: [],
    nbFetchedByCriteria: 0,
    nbFetchedMy: 0,
    fetchedById: {},
    messages: [],
    myRights: [],
    isOwner: false,
    sharedContent: []
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MY_EVENTS":
        let val = action.payload;
        // if(action.offset !== 0)
        //   val = state.my_events.push(val)
        return {
            ...state,
            my_events: val
        };
      case "UPDATE_EVENTS_BY_CRITERIA":
        let _val = action.payload;
        // if(action.offset !== 0)
        //   _val = state.fetchedByCriteria.push(_val)
        return {
          ...state,
          fetchedByCriteria: _val
        };
      case "UPDATE_EVENTS_BY_ID":
        return {
          ...state,
          fetchedById: action.payload
        };
      case "UPDATE_EVENTS_MESSAGES":
        let __val = action.payload;
        // if(action.offset !== 0)
        //   __val = state.messages.push(__val)
        return {
          ...state,
          messages: __val
        };
      case "UPDATE_MY_RIGHTS":
        return {
          ...state,
          myRights: action.payload.rights,
          isOwner: action.payload.isOwner
        };
      case "UPDATE_EVENT_SHARED_CONTENT":
        let ___val = action.payload;
        // if(action.offset !== 0)
        //   ___val = state.messages.push(___val)
        return {
          ...state,
          sharedContent: ___val
        };
      default:
        return state;
    }
  };
  