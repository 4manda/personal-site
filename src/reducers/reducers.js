import { combineReducers } from 'redux';

import * as currentUser from './currentUser';
import * as currentTime from './currentTime';
import * as todo from './todo';
import * as visibilityFilter from './visibilityFilter';
//import * as navBar from './navBar';

export const rootReducer = combineReducers({
  currentTime: currentTime.reducer,
  currentUser: currentUser.reducer,
  todos: todo.reducer,
  visibilityFilter: visibilityFilter.reducer,
})

export const initialState = {
  currentTime: currentTime.initialState,
  currentUser: currentUser.initialState,
  todos: todo.initialState,
  visibilityFilter: visibilityFilter.initialState,
}

export default rootReducer;
