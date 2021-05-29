import { useContext } from "react";
import RolesContext from "../context/rolesContext";
import { 
  createRole,
  updateRole,
  deleteRole
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
