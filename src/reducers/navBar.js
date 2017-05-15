import * as types from '../types';

const initialState = {
  navList: [
    ["home"],
    ["timeline"],
    ["sand-box", [
      ["overview"],
      ["apps", [
        ["todo"],
        ["time"],
        ["tictac"]]],
      ["gallery"]]],
    ["about"]
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_DROP:
      return {
        
      }
    case types.TOGGLE_NAVBAR:
      return {
      
      }
    default:
      return state
  }
}
