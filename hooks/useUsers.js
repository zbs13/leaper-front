import { useContext } from "react";
import UsersContext from "../context/usersContext";
import {
  fetchUserById,
  fetchUsersByName
} from '../context/actions/users';
import { response } from '../context/actions/apiCall';

const useUsers = () => {
  const {
    state: { users: usersState },
    dispatch,
  } = useContext(UsersContext);

  const actions = {
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
    }
  };

  const selectors = {
    getUser: () => usersState.user,
  };

  return { selectors, actions };
};

export default useUsers;
