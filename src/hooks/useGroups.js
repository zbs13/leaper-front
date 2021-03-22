import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import { fetchMyGroups } from '../context/actions/groups';
import { response } from '../context/actions/apiCall';

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    fetchAllMy: function () {
      return fetchMyGroups().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_MY_GROUPS",
            payload: res
          });
        })
      });
    },
    updateAll: function(data){
      
    }
  };

  const selectors = {
    getAllMy: () => groupsState.my_groups,
  };

  return { selectors, actions };
};

export default useGroups;
