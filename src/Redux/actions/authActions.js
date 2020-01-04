import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_LOGIN_ERROR, SET_USER_TO_UPDATE } from "./types";
import apiList from "../../services/apis/apiList"
const {loginUserApi} = apiList;

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("",  userData)
    .then(res => history.push("/login")) // redirect to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set errors when trying to log in
export const setErrorLogin = value => dispatch => {
  dispatch({type:SET_LOGIN_ERROR, payload: value})
}

//Set Name & id to update User Details
export const setUserToUpdate = value => dispatch => {
  dispatch({type:SET_USER_TO_UPDATE, payload: value})
}



// Login - get user token
export const loginUser = userData => dispatch => {

  axios
    .post(loginUserApi, userData)
    .then(res => {
      
      // Save to localStorage
      // Set token to localStorage

      

      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>{
      
      if(err.isAxiosError){
        console.log({"ERROR":err.message})
      } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}}
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};


