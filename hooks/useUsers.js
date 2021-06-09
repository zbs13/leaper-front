import { useContext } from "react";
import UsersContext from "../context/usersContext";
import {
  login,
  fetchUserById,
  fetchUsersByName,
  fetchConnectedUser
} from '../context/actions/users';
import { response } from '../context/actions/apiCall';
import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "../providers/global";

const useUsers = () => {
  const {
    state: { users: usersState },
    dispatch,
  } = useContext(UsersContext);

  const actions = {
    /**
     * user login
     * 
     * @param {string} mail user mail
     * @param {string} password user password
     */
    login: function(mail, password){
      return login(mail, password).then((data) => {
        return response(data, function(res){
          AsyncStorage.setItem("api_token", res.token);
          AsyncStorage.setItem("isConnected", "true");
        })
      });
    },
    /**
     * logout
     */
    logout: function(){
      AsyncStorage.removeItem("api_token");
      AsyncStorage.setItem("isConnected", "false");
      dispatch({
        type: "LOGOUT",
        payload: {},
      });
    },
    /**
     * update user connection status
     * 
     * @param {boolean} isConnected is user connected
     */
    updateIsConnected: function(isConnected){
      dispatch({
        type: "UPDATE_IS_CONNECTED",
        payload: isConnected,
      });
    },
    /**
     * get user datas by id
     * 
     * @param {string} id 
     * @returns 
     */
    fetchUserById: function(id){
      return fetchUserById(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_USER",
            payload: res,
          });
        })
      });
    },
    /**
     * fetch user by firstname/lastname
     * 
     * @param {string} value lastname, firstname value
     * @param {number} offset for results
     */
    fetchUsersByName: function(value, offset){
      return fetchUsersByName(value, offset).then((data) => {
        return response(data)
      });
    },
    /**
     * fetch connected user
     * 
     * @returns 
     */
    fetchConnectedUser: function(){
      return fetchConnectedUser().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_CONNECTED_USER",
            payload: res,
          });
        })
      });
    }
  };

  const selectors = {
    getUser: () => usersState.user,
    isConnected: () => usersState.isConnected,
    getConnectedUser: () => usersState.connectedUser
  };

  return { selectors, actions };
};

export default useUsers;
