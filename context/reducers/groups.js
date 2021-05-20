export const initialState = {
    my_groups: [],
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
      case "UPDATE_MY_RIGHTS":
        return {
          ...state,
          myRights: action.payload.rights,
          isOwner: action.payload.isOwner
        };
      case "UPDATE_GROUP_SHARED_CONTENT":
        let __val = action.payload;
        // if(action.offset !== 0)
        //   __val = state.messages.push(__val)
        return {
          ...state,
          sharedContent: __val
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
        }
      default:
        return state;
    }
  };
  