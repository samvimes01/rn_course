import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import App from './App';
import store from './src/store';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

Navigation.registerComponent('navigation.playground.RNRedux', () => RNRedux);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'navigation.playground.RNRedux'
      }
    }
  });
});
