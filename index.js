import React from 'react';
import { Navigation } from "react-native-navigation";
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

//AppRegistry.registerComponent(appName, () => RNRedux);

Navigation.registerComponent(`navigation.playground.RNRedux`, () => RNRedux);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.RNRedux"
      }
    }
  });
});