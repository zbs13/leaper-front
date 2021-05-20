import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { 
  fetchMyEvents, 
  fetchByCriteria, 
  fetchById, 
  fetchMessages, 
  fetchAllSharedContent, 
  update, 
  create, 
  removeUser 
} from '../context/actions/events';
import { response } from '../context/actions/apiCall';
import global from '../providers/global';

const useEvents = () => {
  const {
    state: { events: eventsState },
    dispatch,
  } = useContext(EventsContext);

  const actions = {
    /**
     * fetch all my events
     * 
     * @param {number} offset from position in db 
     * @returns 
     */
    fetchAllMy: function (offset = 0) {
      return fetchMyEvents(offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_MY_EVENTS",
            payload: res,
            offset: offset
          });
        })
      });
    },
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
            offset: criteria.offset
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
          dispatch({
            type: "UPDATE_EVENTS_BY_ID",
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
            res.users.map((index, user) => {
              if(user.id === myId){
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
      });
    },
    /**
     * fetch event messages
     * 
     * @param {string} id event id
     * @param {number} offset from position in db
     * @returns 
     */
    fetchMessages: function(id, offset){
      return fetchMessages(id, offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENTS_MESSAGES",
            payload: res,
            offset: offset
          });
        })
      });
    },
    /**
     * fetch event datas + messages + my rights by id
     * 
     * @param {string} id event id
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
     * fetch event shared content
     * 
     * @param {string} id event id
     * @param {number} offset from position in db
     * @returns 
     */
     fetchAllSharedContent: function(id, offset){
      return fetchAllSharedContent(id, offset).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENT_SHARED_CONTENT",
            payload: res,
            offset: offset
          });
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
        return response(data);
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
        return response(data);
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
    }
  };

  const selectors = {
    getAllMy: () => eventsState.my_events,
    getFetchedByCriteria: () => eventsState.fetchedByCriteria,
    getNbFetchedByCriteria: () => eventsState.nbFetchedByCriteria,
    getNbMyFetched: () => eventsState.nbFetchedMy,
    getFetchedById: () => eventsState.fetchedById,
    getMessages: () => eventsState.messages,
    getMyRights: () => eventsState.myRights,
    hasRight: (right) => eventsState.myRights.includes(right),
    isOwner: () => eventsState.isOwner,
    getSharedContent: () => eventsState.sharedContent
  };

  return { selectors, actions };
};

export default useEvents;
