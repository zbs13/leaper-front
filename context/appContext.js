import React, { createContext, useReducer } from "react";
import {
  initialState as appInitialState,
  reducer as appReducer,
} from "./reducers/app";
import combineReducers from "./combine";

const AppContext = createContext(null);

const reducers = combineReducers({
  app: appReducer
});

const initialState = {
  app: appInitialState
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
