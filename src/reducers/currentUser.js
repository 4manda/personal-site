import * as types from '../types';

const initialState = {
  user: {},
  loggedIn: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state, 
        user: action.user,
        pwd: action.pwd,
        loggedIn: true
      };
    case types.LOGOUT:
      return {
        ...state,
        user: {},
        pwd: {},
        loggedIn: false
      };
    default:
      return state
  }
}

export default reducer;
