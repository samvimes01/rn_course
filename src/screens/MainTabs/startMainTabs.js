import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
  if (buttonId === 'menuButton') {
    Navigation.mergeOptions('leftMenu', {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }
});

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
  ]).then((sources) => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              id: 'leftMenu',
              name: 'SideMenu'
            }
          },
          center: {
            bottomTabs:
            {
              id: 'BottomTabsId',
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'FindPlaceScreen',
                          options: {
                            topBar: {
                              title: { text: 'Find Place' },
                              leftButtons: [
                                {
                                  id: 'menuButton',
                                  icon: sources[2],
                                  color: 'orange'
                                }
                              ],
                              rightButtons: [],
                            },
                            bottomTab: {
                              text: 'Find Place',
                              icon: sources[0],
                              testID: 'FIRST_TAB_BAR_BUTTON',
                              selectedIconColor: 'orange',
                            }
                          }
                        }
                      }
                    ],
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'SharePlaceScreen',
                          options: {
                            topBar: {
                              title: { text: 'Share Place' },
                              leftButtons: [
                                {
                                  id: 'menuButton',
                                  icon: sources[2],
                                  color: 'orange'
                                }
                              ],
                              rightButtons: [],
                            },
                            bottomTab: {
                              text: 'Share Place',
                              icon: sources[1],
                              testID: 'SECOND_TAB_BAR_BUTTON',
                              selectedIconColor: 'orange',
                            }
                          }
                        }
                      }
                    ],
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default startTabs;
