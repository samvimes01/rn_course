import { createStore, combineReducers } from 'redux';
import { placesReducer } from './places';

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer);

export default store;