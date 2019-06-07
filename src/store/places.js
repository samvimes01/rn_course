import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE
} from "./actionTypes";

const initialState = {
  places: [],
  selectedPlace: null
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
            image: {
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/b/b6/Dakota-Hotel-WEB.jpg'
            }
          }
        ]
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== state.selectedPlace.key),
        selectedPlace: null
      };
    case SELECT_PLACE:
      return { ...state, selectedPlace: state.places.find(place => place.key === action.placeKey) };
    case DESELECT_PLACE:
      return { ...state, selectedPlace: null };
    default:
      return state;
  }
};

//Action creators
export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    placeName: placeName
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  };
};

export const selectPlace = (key) => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};