import React, { createContext, useReducer } from "react";
import {
  initialState as rolesInitialState,
  reducer as rolesReducer,
} from "./reducers/roles";
import combineReducers from "./combine";

const RolesContext = createContext(null);

const reducers = combineReducers({
    roles: rolesReducer
});

const initialState = {
    roles: rolesInitialState
};

export const RolesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <RolesContext.Provider value={{ state, dispatch }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContext;
