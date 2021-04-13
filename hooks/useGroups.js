import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import { fetchMyGroups, fetchById } from '../context/actions/groups';
import { response } from '../context/actions/apiCall';

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    fetchAllMy: function (offset) {
      return fetchMyGroups(offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_MY_GROUPS",
            payload: res
          });
        })
      });
    },
    updateAll: function(data){
      
    },
    fetchById: function(id) {
      return fetchById(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS_BY_ID",
            payload: res
          });
        })
      });
    }
  };

  const selectors = {
    getAllMy: () => groupsState.my_groups,
    getNbMyFetched: () => groupsState.nbFetchedMy,
    getFetchedById: () => groupsState.fetchedById,
  };

  return { selectors, actions };
};

export default useGroups;
