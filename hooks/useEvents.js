import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { 
  fetchByCriteria, 
  fetchById,
  update, 
  create, 
  removeUser,
  addUserToEvent,
  deleteById
} from '../context/actions/events';
import { response } from '../context/actions/apiCall';
import global from '../providers/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useEvents = () => {
  const {
    state: { events: eventsState },
    dispatch,
  } = useContext(EventsContext);

  const actions = {
    /**
     * fetch events by criteria
     * 
     * @param {object} criteria events search criterias => offset, adress, startDate, endDate
     * @returns 
     */
    fetchByCriteria: function(criteria) {
      return fetchByCriteria(criteria).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENTS_BY_CRITERIA",
            payload: res,
            offset: criteria.criteria.offset
          });
        })
      });
    },
    /**
     * fetch event by id
     * 
     * @param {string} id event id
     * @returns 
     */
    fetchById: function(id) {
      return fetchById(id).then((data) => {
        return response(data, function(res){
          AsyncStorage.getItem("connectedUserId").then((userId) => {
            dispatch({
              type: "UPDATE_EVENTS_BY_ID",
              payload: res
            });
            let rightsArr = [];
            let isOwner = false;
            if(res.owner.id === userId){
              rightsArr = global.rights.ALL;
              isOwner = true;
            }else{
              res.users.map((index, user) => {
                if(user.id === userId){
                  user.roles.map((index, role) => {
                    if(role.event.id === id){
                      
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
     * create a new event
     * 
     * @param {object} values all event values
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
     * edit an event
     * 
     * @param {string} id event id to edit
     * @param {object} values all event values
     */
    updateById: function(id, values){
      return update(id, values).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENTS_BY_ID",
            payload: res
          });
        });
      });
    },
    /**
     * remove an user from an event
     * 
     * @param {string} userId user id to remove
     * @param {string} eventId event id
     */
    removeUser: function(userId, eventId){
      return removeUser(userId, eventId).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "REMOVE_USER",
            payload: userId
          });
        })
      });
    },
    /**
     * delete a role in UI from fetched event by id
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
     * add user to event
     * 
     * @param {string} eventId event id
     * @param {string} userId user id to add
     */
    addUserToEvent: function(eventId, userId){
      return addUserToEvent(eventId, userId).then((data) => {
        return response(data);
      })
    },
    /**
     * delete an event by id
     * 
     * @param {string} id event id to delete
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
     * called to check if events need a refresh or not
     * 
     * @param {boolean} needReload true if events need a refresh
     */
     updateNeedReload: function(needReload){
      dispatch({
        type: "UPDATE_NEED_RELOAD",
        payload: needReload
      });
    }
  };

  const selectors = {
    getFetchedByCriteria: () => eventsState.fetchedByCriteria,
    getNbFetchedByCriteria: () => eventsState.nbFetchedByCriteria,
    getFetchedById: () => eventsState.fetchedById,
    hasRight: (right) => eventsState.myRights.includes(right),
    isOwner: () => eventsState.isOwner,
    needReload: () => eventsState.needReload
  };

  return { selectors, actions };
};

export default useEvents;
