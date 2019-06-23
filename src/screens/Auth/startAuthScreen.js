
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
              id: 'AuthScreenId',
              name: 'AuthScreen',
            }
          }
        ],
      }
    }
  });
};

export default startAuthScreen;
