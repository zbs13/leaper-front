import React, { createContext, useReducer } from "react";
import {
  initialState as usersInitialState,
  reducer as usersReducer,
} from "./reducers/users";
import combineReducers from "./combine";

const UsersContext = createContext(null);

const reducers = combineReducers({
    users: usersReducer
});

const initialState = {
    users: usersInitialState
};

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
