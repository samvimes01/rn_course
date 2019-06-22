
import { Navigation } from 'react-native-navigation';

const startAuthScreen = () => {
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
};

Navigation.events().registerAppLaunchedListener(startAuthScreen);

export default startAuthScreen;
