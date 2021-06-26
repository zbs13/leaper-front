import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import {
  fetchById, 
  fetchMessages, 
  fetchAllSharedContent, 
  update, 
  create,
  removeUser,
  deleteById
} from '../context/actions/groups';
import { response } from '../context/actions/apiCall';
import global from '../providers/global';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGroups = () => {
  const {
    state: { groups: groupsState },
    dispatch,
  } = useContext(GroupsContext);

  const actions = {
    /**
     * fetch group by id
     * 
     * @param {string} id group id
     * @returns 
     */
    fetchById: function(id) {
      return fetchById(id).then((data) => {
        return response(data, function(res){
          AsyncStorage.getItem("connectedUserId").then((userId) => {
            dispatch({
              type: "UPDATE_GROUPS_BY_ID",
              payload: res
            });
            let rightsArr = [];
            let isOwner = false;
            if(res.owner.id === userId){
              rightsArr = global.rights.ALL;
              isOwner = true;
            }else{
              res.users.map((user, index) => {
                if(user.id === userId){
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
        return response(data, function(res){
          dispatch({
            type: "UPDATE_NEED_RELOAD",
            payload: true
          });
        });
      });
    },
    /**
     * edit a group
     * 
     * @param {string} id group id to edit
     * @param {object} values all group values
     */
     updateById: function(id, values){
      return update(id, values).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS_BY_ID",
            payload: res
          });
        });
      });
    },
    /**
     * remove an user from an a group
     * 
     * @param {string} userId user id to remove
     * @param {string} groupId group id
     */
    removeUser: function(userId, groupId){
      return removeUser(userId, groupId).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "REMOVE_USER",
            payload: userId
          });
        })
      });
    },
    /**
     * delete a group by id
     * 
     * @param {string} id group id to delete
     */
    deleteById: function(id){
      return deleteById(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_NEED_RELOAD",
            payload: true
          });
        });
      });
    },
    /**
     * delete a role in UI from fetched group by id
     * 
     * @param {string} id role id to delete in UI
     */
     deleteRoleInUI: function(id){
      dispatch({
        type: "DELETE_ROLE_IN_UI",
        payload: id
      });
    },
    /**
     * called to check if groups need a refresh or not
     * 
     * @param {boolean} needReload true if groups need a refresh
     */
    updateNeedReload: function(needReload){
      dispatch({
        type: "UPDATE_NEED_RELOAD",
        payload: needReload
      });
    }
  };

  const selectors = {
    getFetchedById: () => groupsState.fetchedById,
    getMessages: () => groupsState.messages,
    getMyRights: () => groupsState.myRights,
    hasRight: (right) => groupsState.myRights.includes(right),
    isOwner: () => groupsState.isOwner,
    getSharedContent: () => groupsState.sharedContent,
    needReload: () => groupsState.needReload
  };

  return { selectors, actions };
};

export default useGroups;
