import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './src/store';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideMenu from './src/screens/SideMenu/SideMenu';

Navigation.registerComponent('AuthScreen', () => props => (
  <Provider store={store}>
    <AuthScreen {...props} />
  </Provider>
), () => AuthScreen);

Navigation.registerComponent('SharePlaceScreen', () => props => (
  <Provider store={store}>
    <SharePlaceScreen {...props} />
  </Provider>
), () => SharePlaceScreen);

Navigation.registerComponent('FindPlaceScreen', () => props => (
  <Provider store={store}>
    <FindPlaceScreen {...props} />
  </Provider>
), () => FindPlaceScreen);

Navigation.registerComponent('PlaceDetailScreen', () => props => (
  <Provider store={store}>
    <PlaceDetailScreen {...props} />
  </Provider>
), () => PlaceDetailScreen);

Navigation.registerComponent('SideMenu', () => SideMenu);


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            title: { text: 'Login' }
          }
        },
        children: [
          {
            component: {
              name: 'AuthScreen',
            }
          }
        ],
      }
    }
  });
});
