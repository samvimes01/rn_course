import React from 'react';
import {
  View, StyleSheet, Text, Dimensions
} from 'react-native';

const SideMenu = () => (
  <View
    style={[
      styles.container,
      { width: Dimensions.get('window').width * 0.8 }
    ]}
  >
    <Text>SideDrawer</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: 'white',
    flex: 1
  }
});

export default SideMenu;
