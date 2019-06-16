/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, compose } from 'redux';
import { placesReducer } from './places';

const rootReducer = combineReducers({
  places: placesReducer
});

const composeEnhancers = __DEV__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
