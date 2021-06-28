export const initialState = {
    fetchedById: {},
    myRights: [],
    isOwner: false,
    needReload: false
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_NEED_RELOAD":
        return {
          ...state,
          needReload: action.payload
        }
      case "UPDATE_GROUPS_BY_ID":
        return {
          ...state,
          fetchedById: action.payload
        }
      case "UPDATE_MY_RIGHTS":
        return {
          ...state,
          myRights: action.payload.rights,
          isOwner: action.payload.isOwner
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
  