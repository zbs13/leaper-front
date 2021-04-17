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
    updateAll: function(data){
      
    },
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
    }
  };

  const selectors = {
    getAllMy: () => eventsState.my_events,
    getFetchedByCriteria: () => eventsState.fetchedByCriteria,
    getNbFetchedByCriteria: () => eventsState.nbFetchedByCriteria,
    getNbMyFetched: () => eventsState.nbFetchedMy,
    getFetchedById: () => eventsState.fetchedById,
    getMessages: () => eventsState.messages
  };

  return { selectors, actions };
};

export default useEvents;
