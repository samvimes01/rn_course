/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { AsyncStorage } from 'react-native';

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import startTabs from '../screens/MainTabs/startMainTabs';
import startAuthScreen from '../screens/Auth/startAuthScreen';

const API_KEY = 'AIzaSyAGOSh_RGH06vRTohFaT-iPt4mVHnD1D_k';

const initialState = {
  token: null,
  expiryDate: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    default:
      return state;
  }
};

// Action creators
export const authSetToken = (token, expiryDate) => ({
  type: AUTH_SET_TOKEN,
  token,
  expiryDate,
});

export const authRemoveToken = token => ({
  type: AUTH_REMOVE_TOKEN,
  token
});

// Thunk actions
export const tryAuth = (authData, mode) => (dispatch) => {
  dispatch(uiStartLoading());
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  if (mode === 'signup') {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  }
  fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Authentication failed, please try again!');
      dispatch(uiStopLoading());
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((parsedRes) => {
      dispatch(uiStopLoading());
      const { idToken, expiresIn, refreshToken } = parsedRes;
      if (!parsedRes.idToken) {
        alert('Authentication failed, please try again!');
      } else {
        dispatch(authSaveToken(idToken, expiresIn, refreshToken));
        startTabs();
      }
    });
};

export const authSaveToken = (token, expiresIn, refreshToken) => (dispatch) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiresIn * 1000;
  dispatch(authSetToken(token, expiryDate));
  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
  AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
};

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const { token, expiryDate } = getState().auth;
    if (!token || new Date(+expiryDate) <= new Date()) {
      AsyncStorage.getItem('ap:auth:token')
        .catch(error => reject(error))
        .then((savedToken) => {
          if (!savedToken) {
            reject();
            return;
          }
          return [AsyncStorage.getItem('ap:auth:expiryDate'), savedToken];
        })
        .then(([savedDate, savedToken]) => {
          const expirationDate = new Date(+savedDate);
          const now = new Date();
          if (expirationDate > now) {
            dispatch(authSetToken(savedToken));
            resolve(savedToken);
          } else {
            reject();
          }
        })
        .catch(error => reject(error));
    }
    resolve(token);
  });

  return promise.catch(error => AsyncStorage.getItem('ap:auth:refreshToken')
    .then(refreshToken => fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    }))
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((parsedRes) => {
      const { id_token, expires_in, refresh_token } = parsedRes;
      if (id_token) {
        dispatch(authSaveToken(id_token, expires_in, refresh_token));
        return id_token;
      }
      authClearStorage();
    })
    .then((token) => {
      if (!token) {
        throw new Error();
      } else {
        return token;
      }
    }));
};

export const authAutoSignIn = () => (dispatch) => {
  dispatch(authGetToken())
    .then(() => startTabs())
    .catch(error => console.log('Failed to fetch token ', error));
};

// Helpers
function authClearStorage() {
  AsyncStorage.removeItem('ap:auth:token');
  AsyncStorage.removeItem('ap:auth:expiryDate');
  return AsyncStorage.removeItem('ap:auth:refreshToken');
}

export const authLogout = () => (dispatch) => {
  authClearStorage()
    .then(() => startAuthScreen());
};
