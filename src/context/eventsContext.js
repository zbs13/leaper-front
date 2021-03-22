import React, { createContext, useReducer } from "react";
import {
  initialState as eventsInitialState,
  reducer as eventsReducer,
} from "./reducers/events";
import combineReducers from "./combine";

const EventsContext = createContext(null);

const reducers = combineReducers({
    events: eventsReducer
});

const initialState = {
  events: eventsInitialState
};

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
