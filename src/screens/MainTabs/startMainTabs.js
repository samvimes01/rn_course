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
            stack: {
              options: {
                topBar: {
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: sources[2],
                      color: 'orange'
                    }
                  ],
                  rightButtons: [],
                }
              },
              children: [{
                bottomTabs:
                {
                  children: [
                    {
                      stack: {
                        options: {
                          topBar: {
                            title: { text: 'Find Place' },
                          }
                        },
                        children: [
                          {
                            component: {
                              name: 'FindPlaceScreen',
                              options: {
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
                        options: {
                          topBar: {
                            title: { text: 'Share Place' },
                          }
                        },
                        children: [
                          {
                            component: {
                              name: 'SharePlaceScreen',
                              options: {
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
                  ],
                  options: {}
                }
              }]
            }
          }
        }
      }
    });
  });
};

export default startTabs;
