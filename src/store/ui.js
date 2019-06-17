import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes';

const initialState = {
  isLoading: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export const uiStartLoading = () => ({
  type: UI_START_LOADING
});

export const uiStopLoading = () => ({
  type: UI_STOP_LOADING
});
