import { Navigation } from 'react-native-navigation';
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
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('ios-menu', 30)
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
                      icon: sources[2]
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
                                  icon: sources[0],
                                  testID: 'SECOND_TAB_BAR_BUTTON',
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
