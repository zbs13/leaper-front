import React, { createContext, useReducer } from "react";
import {
  initialState as groupsInitialState,
  reducer as groupsReducer,
} from "./reducers/groups";
import combineReducers from "./combine";

const GroupsContext = createContext(null);

const reducers = combineReducers({
  groups: groupsReducer
});

const initialState = {
  groups: groupsInitialState
};

export const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <GroupsContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};

export default GroupsContext;
