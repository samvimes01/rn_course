/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import {
  createStore, combineReducers, compose, applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import { placesReducer } from './places';
import { uiReducer } from './ui';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer,
});

const composeEnhancers = __DEV__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
