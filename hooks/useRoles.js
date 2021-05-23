import { useContext } from "react";
import RolesContext from "../context/rolesContext";
import { deleteRole } from '../context/actions/roles';
import { response } from '../context/actions/apiCall';

const useRoles = () => {
  const {
    state: { roles: rolesState },
    dispatch,
  } = useContext(RolesContext);

  const actions = {
    /**
     * delete a role
     * 
     * @param {string} id role id to delete
     */
    deleteRole: function(id){
        return deleteRole(id).then((data) => {
            return response(data)
        });
    }
  };

  const selectors = {
  };

  return { selectors, actions };
};

export default useRoles;
