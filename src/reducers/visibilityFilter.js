import { VisibilityFilters } from '../actions'
import * as types from '../types';
//const { SHOW_ALL } = VisibilityFilters

const initialState = {
  visibilityFilter: 'SHOW_ALL'
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default reducer;
