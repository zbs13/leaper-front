import { useContext } from "react";
import AppContext from "../context/appContext";
import { fetchUserParameters, updateUserParameters } from '../context/actions/app';

const useApp = () => {
  const {
    state: { app: appState },
    dispatch,
  } = useContext(AppContext);

  const actions = {
    fetchUserParameters: function () {
    //   fetchUserParameters().then((data) => {
    //     dispatch({
    //       type: "UPDATE_USER_PARAMETERS",
    //       payload: data
    //     });
    //   });
    //   dispatch({
    //     type: "UPDATE_USER_PARAMETERS",
    //     payload: datas
    // })
    },
    updateUserParameters: function (datas) {
    //     updateUserParameters(datas).then((data) =>
    //         dispatch({
    //         type: "UPDATE_USER_PARAMETERS",
    //         payload: data
    //     })
    //   );
      dispatch({
        type: "UPDATE_USER_PARAMETERS",
        payload: datas
      })
    },
  };

  const selectors = {
    getUserParameters: () => appState,
    getLang: () => appState.lang,
    getSearchBar: () => appState.searchBar,
    getOS: () => appState.os
  };

  return { selectors, actions };
};

export default useApp;
