import { useContext } from "react";
import RolesContext from "../context/rolesContext";
import { 
  createRole,
  updateRole,
  deleteRole,
  addRoleToUser,
  removeUserRole
} from '../context/actions/roles';
import { response } from '../context/actions/apiCall';

const useRoles = () => {
  const {
    state: { roles: rolesState },
    dispatch,
  } = useContext(RolesContext);

  const actions = {
    /**
     * create a role
     * 
     * @param {boolean} isEvent is an event's role
     * @param {string} geId group/event id
     * @param {object} role role object => name, rights (format -> [1,2...])
     * @returns 
     */
    createRole: function(isEvent, geId, role){
      return createRole(isEvent, geId, role).then((data) => {
        return response(data)
      });
    },
    /**
     * update a role
     * 
     * @param {boolean} isEvent is an event's role
     * @param {string} geId group/event id
     * @param {object} role role object => id, name, rights (format -> [1,2...])
     * @returns 
     */
    updateRole: function(isEvent, geId, role){
      return updateRole(isEvent, geId, role).then((data) => {
        return response(data)
      });
    },
    /**
     * delete a role
     * 
     * @param {string} id role id to delete
     */
    deleteRole: function(id){
      return deleteRole(id).then((data) => {
          return response(data)
      });
    },
    /**
     * update user role
     * 
     * @param {string} oldRoleId old user role to remove from user
     * @param {string} newRoleId new user role to add to user
     * @param {string} userId user id
     */
    updateUserRole: async function(oldRoleId, newRoleId, userId){
      let respRUR = await actions.removeUserRole(oldRoleId, userId);
      if(typeof respRUR.isError !== "undefined"){
        if(respRUR.isError){
            return {"error": true};
        }
      }

      let respARU = await actions.addRoleToUser(newRoleId, userId);
      if(typeof respARU.isError !== "undefined"){
        if(respARU.isError){
            return {"error": true};
        }
      }

      return {};
    },
    /**
     * remove user role
     * 
     * @param {string} roleId role id to remove from user
     * @param {string} userId user id
     */
    removeUserRole: function(roleId, userId){
      return removeUserRole(roleId, userId).then((data) => {
        return response(data)
      });
    },
    /**
     * add a role to an user
     * 
     * @param {string} roleId role id to add to user
     * @param {string} userId user id
     */
    addRoleToUser: function(roleId, userId){
      return addRoleToUser(roleId, userId).then((data) => {
        return response(data)
      });
    },
    /**
     * called to check if roles need a refresh or not
     * 
     * @param {boolean} needReload true if roles need a refresh
     */
    updateNeedReload: function(needReload){
      dispatch({
        type: "UPDATE_NEED_RELOAD",
        payload: needReload
      });
    }
  };

  const selectors = {
    needReload: () => rolesState.needReload
  };

  return { selectors, actions };
};

export default useRoles;
