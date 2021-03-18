import { useContext } from "react";
import EventsContext from "../context/eventsContext";
import { fetchMyEvents } from '../context/actions/events';
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
      
    }
  };

  const selectors = {
    getAllMy: () => eventsState.my_events,
  };

  return { selectors, actions };
};

export default useEvents;
