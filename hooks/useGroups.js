import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import { fetchGroups } from '../context/actions/groups';
import { response } from '../context/actions/apiCall';

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    fetchAll: function () {
      console.log("FETCH");
      return fetchGroups().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS",
            payload: res
          });
        })
      });
    },
    updateAll: function(data){
      
    }
  };

  const selectors = {
    getAll: () => groupsState.groups,
  };

  return { selectors, actions };
};

export default useGroups;
