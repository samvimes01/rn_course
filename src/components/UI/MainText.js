import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MainText = ({ children }) => (
  <Text
    style={styles.text}
  >
    {children}
  </Text>
);
const styles = StyleSheet.create({
  text: {
    color: '#222',
    backgroundColor: 'transparent'
  }
});
export default MainText;
