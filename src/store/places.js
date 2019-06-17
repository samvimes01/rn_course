/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import {
  SET_PLACES,
  REMOVE_PLACE,
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

const initialState = {
  places: [],
};

export const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.key)
      };
    default:
      return state;
  }
};

// Action creators
export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key
});

// Thunk actions
export const savePlace = (placeName, location, image) => (dispatch) => {
  dispatch(uiStartLoading());
  fetch('https://us-central1-fbs-func-test.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: image.base64
    })
  })
    .catch((err) => {
      console.error(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => fetch('https://fbs-func-test.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify({
        name: placeName,
        location: { latitude: location.latitude, longitude: location.longitude },
        image: parsedRes.imageUrl
      })
    }))
    .catch((err) => {
      console.error(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then((parsedRes) => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    });
};


export const getPlaces = () => (dispatch) => {
  fetch('https://fbs-func-test.firebaseio.com/places.json')
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.error(err);
    })
    .then(res => res.json())
    .then((parsedRes) => {
      const places = [];
      Object.keys(parsedRes).forEach((key) => {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key
        });
      });
      dispatch(setPlaces(places));
    });
};


export const deletePlace = key => (dispatch) => {
  dispatch(removePlace(key));
  fetch(`https://fbs-func-test.firebaseio.com/places/${key}/.json`, { method: 'DELETE' })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.error(err);
    })
    .then(res => res.json())
    .then((res) => {
      console.log('Done! ', res);
    });
};
