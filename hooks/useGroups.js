import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import { fetchMyGroups, fetchById, fetchMessages, fetchAllSharedContent, update, create } from '../context/actions/groups';
import { response } from '../context/actions/apiCall';
import global from '../providers/global';

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    /**
     * fetch all my groups
     * 
     * @param {number} offset from position in db 
     * @returns 
     */
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
    /**
     * fetch group by id
     * 
     * @param {string} id group id
     * @returns 
     */
    fetchById: function(id) {
      return fetchById(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS_BY_ID",
            payload: res
          });
          /**
           * 
           */
            const myId = 2;
            /**
            * 
            */
            let rightsArr = [];
            let isOwner = false;
            if(res.owner.id === myId){
              rightsArr = global.rights.ALL;
              isOwner = true;
            }else{
              res.users.map((user, index) => {
                if(user.id === myId){
                  user.roles.map((role, index) => {
                    if(role.group.id === id){
                      for(let right of role.rights){
                        rightsArr.push(right.id);
                      }
                    }
                  })
                }
              })
            }

            dispatch({
              type: "UPDATE_MY_RIGHTS",
              payload: {
                rights: rightsArr,
                isOwner: isOwner
              }
            });
        })
      });
    },
    /**
     * fetch group messages
     * 
     * @param {string} id group id
     * @param {number} offset from position in db
     * @returns 
     */
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
    },
    /**
     * fetch group datas + messages + my rights by id
     * 
     * @param {string} id group id
     * @param {number} offset from position in db
     */
    fetchAllById: async function(id, offset){
      let respFBI = await actions.fetchById(id);
      let respFM = await actions.fetchMessages(id, offset);
      if(typeof respFBI.isError !== "undefined" || typeof respFM.isError !== "undefined"){
        if(respFBI.isError || respFM.isError){
            return {"error": true};
        }
      }

      return {};
    },
    /**
     * fetch group shared content
     * 
     * @param {string} id group id
     * @param {number} offset from position in db
     * @returns 
     */
    fetchAllSharedContent: function(id, offset){
      return fetchAllSharedContent(id, offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUP_SHARED_CONTENT",
            payload: res,
            offset: offset
          });
        })
      });
    },
    /**
     * create a new group
     * 
     * @param {object} values all group values
     */
     create: function(values){
      return create(values).then((data) => {
        return response(data);
      });
    },
    /**
     * edit an event
     * 
     * @param {string} id group id to edit
     * @param {object} values all group values
     */
     updateById: function(id, values){
      return update(id, values).then((data) => {
        return response(data);
      });
    }
  };

  const selectors = {
    getAllMy: () => groupsState.my_groups,
    getNbMyFetched: () => groupsState.nbFetchedMy,
    getFetchedById: () => groupsState.fetchedById,
    getMessages: () => groupsState.messages,
    getMyRights: () => groupsState.myRights,
    hasRight: (right) => groupsState.myRights.includes(right),
    isOwner: () => groupsState.isOwner,
    getSharedContent: () => groupsState.sharedContent
  };

  return { selectors, actions };
};

export default useGroups;
