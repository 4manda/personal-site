import * as types from '../types';

const initialState = {
}

const todo = (state, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case types.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    case types.REMOVE_TODO:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed,
        deleted: true
      }
    default:
      return state
  }
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
    return [
      ...state,
      todo(undefined, action)
    ]
    case types.TOGGLE_TODO:
      return state.map(t => 
        todo(t, action)
      )
    case types.REMOVE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default reducer;
