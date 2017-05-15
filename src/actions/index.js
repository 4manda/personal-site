import * as types from '../types';

//--------------------------------
// Todo Actions
//--------------------------------
let nextTodoId = 0
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
  return { type: 'ADD_TODO', id: nextTodoId++, text }
}

export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}

export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter }
}

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  id
})

//--------------------------------
// CurrentTime action
//--------------------------------
const host = 'https://andthetimeis.com'
export const fetchNewTime = ({ timezone = 'pst', str='now'}) => ({
  type: types.FETCH_NEW_TIME,
  payload: new Date().toString(), //Any serializable value
  meta: {
    type: 'api',
    url: host + '/' + timezone + '/' + str + '.json'
  }
})

//--------------------------------
// Login/logout actions
//--------------------------------
export const login = (user) => ({
  type: types.LOGIN,
  payload: user,
})

export const logout = () => ({
  type: types.LOGOUT,
})

//------------------------------
// NavBar Actions
//------------------------------
export function toggleDrop(id) {
  return { type: 'TOGGLE_DROP', id }
}

export function toggleNavBar() {
  return { type: 'TOGGLE_NAVBAR' }
}
