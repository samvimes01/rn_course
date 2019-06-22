import React from 'react';
import { connect } from 'react-redux';

import {
  View, StyleSheet, Text, Dimensions, TouchableOpacity, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { authLogout } from '../../store/auth';

// eslint-disable-next-line no-shadow
const SideMenu = ({ authLogout }) => (
  <View
    style={[
      styles.container,
      { width: Dimensions.get('window').width * 0.8 }
    ]}
  >
    <TouchableOpacity onPress={authLogout}>
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

export default connect(null, { authLogout })(SideMenu);
