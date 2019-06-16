import {
  ADD_PLACE,
  DELETE_PLACE,
} from './actionTypes';

const initialState = {
  places: [],
};

export const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: [
          ...state.places,
          {
            key: Math.random().toString(),
            name: action.placeName,
            image: { uri: action.image.uri },
            location: action.location
          }
        ]
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.key),
      };
    default:
      return state;
  }
};

// Action creators
export const addPlace = (placeName, location, image) => ({
  type: ADD_PLACE,
  placeName,
  location,
  image
});

export const deletePlace = key => ({
  type: DELETE_PLACE,
  key
});
