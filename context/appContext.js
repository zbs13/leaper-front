import React, { createContext, useReducer } from "react";
import {
  initialState as appInitialState,
  reducer as appReducer,
} from "./reducers/app";

const AppContext = createContext(null);

function combineReducers(reducerDict) {
  return function (state = {}, action) {
    return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...stateGlobal, [curr]: slice };
    }, state);
  };
}

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
