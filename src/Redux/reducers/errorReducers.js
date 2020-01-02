import { GET_ERRORS, SET_LOGIN_ERROR } from "../actions/types";

const initialState = {loginError: false};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {...action.payload, loginError: true};
    case SET_LOGIN_ERROR:
      return {...state, loginError: action.payload};
    default:
      return state;
  }
}