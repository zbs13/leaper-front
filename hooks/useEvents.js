import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { fetchEvents } from '../context/actions/events';
import { response } from '../context/actions/apiCall';

const useEvents = () => {
  const {
    state: { events: eventsState },
    dispatch,
  } = useContext(EventsContext);

  const actions = {
    fetchAll: function () {
      return fetchEvents().then((data) => {
        console.log("FETCH EVENT => ", data)
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENTS",
            payload: res
          });
        })
      });
    },
    updateAll: function(data){
      
    }
  };

  const selectors = {
    getAll: () => eventsState.groups,
  };

  return { selectors, actions };
};

export default useEvents;
