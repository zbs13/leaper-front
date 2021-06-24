export const initialState = {
    fetchedByCriteria: [],
    nbFetchedByCriteria: 0,
    fetchedById: {},
    fetchedDetailsById: {},
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
      case "UPDATE_EVENTS_BY_CRITERIA":
        let _val = action.payload;
        if(action.offset !== 0)
          _val = state.fetchedByCriteria.concat(_val)
        return {
          ...state,
          fetchedByCriteria: _val,
          nbFetchedByCriteria: _val.length
        };
      case "UPDATE_EVENTS_BY_ID":
        return {
          ...state,
          fetchedById: action.payload
        };
      case "UPDATE_EVENTS_DETAILS_BY_ID":
        return {
          ...state,
          fetchedDetailsById: action.payload
        };
      case "UPDATE_EVENTS_MESSAGES":
        let __val = action.payload;
        if(action.offset !== 0){
          __val.push(...state.messages)
        }
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
      case "REMOVE_USER":
        let users = state.fetchedById.users;
        users.splice(users.findIndex(o => o.id === action.payload), 1);
        return {
          ...state,
          fetchedById: {
            ...state.fetchedById,
            users: users
          }
        };
      case "SEND_MESSAGE":
        let messages = state.messages
        messages.push(action.payload);
        return {
          ...state,
          messages: messages
        };
      case "DELETE_ROLE_IN_UI":
        let roles = state.fetchedById.roles;
        roles.splice(roles.findIndex(o => o.id === action.payload), 1);
        return {
          ...state,
          fetchedById: {
            ...state.fetchedById,
            roles: roles
          }
        }
      default:
        return state;
    }
  };
  