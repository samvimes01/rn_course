/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_PLACE_ADDING } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { authGetToken } from './auth';

const initialState = {
  places: [],
  placeAdded: false,
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
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };
    case START_PLACE_ADDING:
      return {
        ...state,
        placeAdded: false
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

export const placeAdded = () => ({
  type: PLACE_ADDED,
});

export const startAddingPlace = () => ({
  type: START_PLACE_ADDING,
});

// Thunk actions
export const savePlace = (placeName, location, image) => (dispatch) => {
  let authToken;
  dispatch(uiStartLoading());
  dispatch(authGetToken())
    .catch(() => alert('No valid token found'))
    .then((token) => {
      authToken = token;
      return fetch('https://us-central1-fbs-func-test.cloudfunctions.net/storeImage', {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        }),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    })
    .catch((err) => {
      console.error(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then(parsedRes => fetch(`https://fbs-func-test.firebaseio.com/places.json?auth=${authToken}`, {
      method: 'POST',
      body: JSON.stringify({
        name: placeName,
        location: { latitude: location.latitude, longitude: location.longitude },
        image: parsedRes.imageUrl,
        imagePath: parsedRes.imagePath
      })
    }))
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((parsedRes) => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
      dispatch(placeAdded());
    })
    .catch((err) => {
      console.error(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    });
};


export const getPlaces = () => (dispatch) => {
  dispatch(authGetToken())
    .catch(() => alert('No valid token found'))
    .then(token => fetch(`https://fbs-func-test.firebaseio.com/places.json?auth=${token}`))
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((parsedRes) => {
      const places = [];
      // eslint-disable-next-line no-unused-expressions
      parsedRes && Object.keys(parsedRes).forEach((key) => {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key
        });
      });
      dispatch(setPlaces(places));
    })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.error(err);
    });
};


export const deletePlace = key => (dispatch) => {
  dispatch(authGetToken())
    .catch(() => alert('No valid token found'))
    .then((token) => {
      dispatch(removePlace(key));
      return fetch(`https://fbs-func-test.firebaseio.com/places/${key}/.json?auth=${token}`, { method: 'DELETE' });
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((res) => {
      console.log('Done! ', res);
    })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.error(err);
    });
};
