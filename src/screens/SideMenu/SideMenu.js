import React from 'react';
import {
  View, StyleSheet, Text, Dimensions, TouchableOpacity, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SideMenu = () => (
  <View
    style={[
      styles.container,
      { width: Dimensions.get('window').width * 0.8 }
    ]}
  >
    <TouchableOpacity>
      <View style={styles.menuItem}>
        <Icon
          style={styles.menuItemIcon}
          size={30}
          name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          color="#aaa"
        />
        <Text>Sign Out</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10
  },
  menuItemIcon: {
    marginRight: 10
  }
});

export default SideMenu;
