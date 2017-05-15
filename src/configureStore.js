import { createStore, applyMiddleware } from 'redux';
import { rootReducer, initialState } from './reducers/reducers';
import loggingMiddleware from './middleware/loggingMiddleware';
//import apiMiddleware from './apiMiddleware';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(loggingMiddleware)
  );
  return store;
}

export default configureStore;
