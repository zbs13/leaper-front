import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { fetchMyEvents, fetchByCriteria, fetchById, fetchMessages } from '../context/actions/events';
import { response } from '../context/actions/apiCall';

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

      /**
       * 
       */
      const myId = 2;
      /**
       * 
       */
      let rightsArr = [];
      if(respFBI.owner.id === myId){
        rightsArr = [1, 2, 3, 4];
      }else{
        respFBI.users.map((index, user) => {
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
        payload: rightsArr
      });

      return {};
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
    hasRight: (right) => eventsState.myRights.includes(right)
  };

  return { selectors, actions };
};

export default useEvents;
