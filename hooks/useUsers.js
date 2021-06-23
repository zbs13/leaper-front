import { useContext } from "react";
import UsersContext from "../context/usersContext";
import {
  login,
  fetchUserById,
  fetchUsersByName,
  fetchConnectedUser,
  signup,
  editProfile,
  addBookmark,
  addFriend,
  removeBookmark,
  fetchConnectedUserGroups,
  fetchConnectedUserEvents,
  updateUserPassword
} from '../context/actions/users';
import { response } from '../context/actions/apiCall';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          AsyncStorage.setItem("token", res.token);
          AsyncStorage.setItem("isConnected", "true");
          AsyncStorage.setItem("connectedUserId", res.user.id);
        })
      });
    },
    /**
     * logout
     */
    logout: function(){
      AsyncStorage.removeItem("token");
      AsyncStorage.setItem("isConnected", "false");
      dispatch({
        type: "LOGOUT",
        payload: {},
      });
    },
    /**
     * create user profile
     * 
     * @param {object} datas user datas
     */
    signup: async function(datas){
      console.log(datas);
      return signup(datas).then((data) => {
        return response(data);
      });
    },
    /**
     * edit user profile
     * 
     * @param {object} datas user datas
     */
     editProfile: function(datas){
      return editProfile(datas).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_CONNECTED_USER_INFOS",
            payload: res,
          });
        });
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
    },
    /**
     * add bookmark
     * 
     * @param {string} id event id
     */
     addBookmark: function(id){
      return addBookmark(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_BOOKMARKS",
            payload: res.bookmarks
          });
        })
      });
    },
    /**
     * remove bookmark
     * 
     * @param {string} id event id
     */
     removeBookmark: function(id){
      return removeBookmark(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_BOOKMARKS",
            payload: res.bookmarks
          });
        })
      });
    },
    /**
     * add friend
     * 
     * @param {string} id friend id
     */
     addFriend: function(id){
      return addFriend(id).then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_FRIENDS",
            payload: res
          });
        })
      });
    },
    /**
     * fetch connected user groups
     * 
     * @returns 
     */
     fetchConnectedUserGroups: function () {
      return fetchConnectedUserGroups().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_GROUPS",
            payload: res.groups
          });
        })
      });
    },
    /**
     * fetch connected user events
     * 
     * @returns 
     */
     fetchConnectedUserEvents: function () {
      return fetchConnectedUserEvents().then((data) => {
        return response(data, function(res){
          dispatch({
            type: "UPDATE_EVENTS",
            payload: res.events
          });
        })
      });
    },
    /**
     * update user password
     * 
     * @param {string} oldPassword old password
     * @param {string} newPassword new password
     */
    updateUserPassword: function({oldPassword, newPassword}){
      return updateUserPassword(oldPassword, newPassword).then((data) => {
        return response(data);
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
