import { useContext } from "react";
import GroupsContext from "../context/groupsContext";
import {
  fetchById, 
  fetchMessages, 
  fetchAllSharedContent, 
  update, 
  create,
  removeUser,
  sendMessage
} from '../context/actions/groups';
import { response } from '../context/actions/apiCall';
import global from '../providers/global';

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
          dispatch({
            type: "UPDATE_GROUPS_BY_ID",
            payload: res
          });
          /**
           * //TODO get real own id
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
     * edit a group
     * 
     * @param {string} id group id to edit
     * @param {object} values all group values
     */
     updateById: function(id, values){
      return update(id, values).then((data) => {
        return response(data);
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
     * send a message
     * 
     * @param {string} groupId group id
     * @param {string} value text value 
     * @param {object} attachment message attachment => 
     *                                        if image/video : height, type, uri, width 
     *                                        if file        : name, size, type, uri
     */
    sendMessage: function(groupId, value, attachment){
      /**
     * TODO change with correct user id
     */
      let userId = 2;
      let userSrc = "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png";
      let userFirstname = "Johnny";
      let userLastname = "matttttttttt";
      /***
     * 
     */
      return sendMessage(userId, groupId, value, attachment).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "SEND_MESSAGE",
            payload: {
              id: "jzaeifhuezi",
              content: value,
              attachment: attachment,
              sentBy: {
                  id: userId,
                  firstname: userFirstname,
                  lastname: userLastname,
                  profilePic: userSrc
              },
              date: "2021-05-21 10:03:54"
            }
          });
        })
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
    }
  };

  const selectors = {
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
