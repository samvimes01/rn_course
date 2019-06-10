import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = ({ style, ...props }) => (
  <TextInput
    style={[styles.input, style]}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#fff'
  }
});

export default DefaultInput;
