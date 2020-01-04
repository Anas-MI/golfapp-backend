import { SET_CURRENT_USER, USER_LOADING, SET_USER_TO_UPDATE } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  userToUpdate:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_USER_TO_UPDATE:
      return {
        ...state,
        userToUpdate: action.payload
      }
    default:
      return state;
  }
}
