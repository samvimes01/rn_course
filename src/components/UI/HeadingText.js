import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = ({ children, style, ...props }) => (
  <Text
    style={[styles.heading, style]}
    {...props}
  >
    {children}
  </Text>
);
const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});
export default HeadingText;
