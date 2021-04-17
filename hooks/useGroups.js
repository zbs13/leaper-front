import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import { fetchMyGroups, fetchById, fetchMessages } from '../context/actions/groups';
import { response } from '../context/actions/apiCall';

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    fetchAllMy: function (offset = 0) {
      return fetchMyGroups(offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_MY_GROUPS",
            payload: res,
            offset: offset
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
    },
    fetchMessages: function(id, offset){
      return fetchMessages(id, offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS_MESSAGES",
            payload: res,
            offset: offset
          });
        })
      });
    }
  };

  const selectors = {
    getAllMy: () => groupsState.my_groups,
    getNbMyFetched: () => groupsState.nbFetchedMy,
    getFetchedById: () => groupsState.fetchedById,
    getMessages: () => groupsState.messages
  };

  return { selectors, actions };
};

export default useGroups;
