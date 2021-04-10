import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { fetchMyEvents, fetchByCriteria, fetchById } from '../context/actions/events';
import { response } from '../context/actions/apiCall';

const useEvents = () => {
  const {
    state: { events: eventsState },
    dispatch,
  } = useContext(EventsContext);

  const actions = {
    fetchAllMy: function () {
      return fetchMyEvents().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_MY_EVENTS",
            payload: res
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
            payload: res
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
    }
  };

  const selectors = {
    getAllMy: () => eventsState.my_events,
    getFetchedByCriteria: () => eventsState.fetchedByCriteria,
    getNbFetchedByCriteria: () => eventsState.nbFetchedByCriteria,
    getFetchedById: () => eventsState.fetchedById,
  };

  return { selectors, actions };
};

export default useEvents;
