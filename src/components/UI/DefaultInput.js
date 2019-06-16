import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = ({ style, valid, touched, ...props }) => (
  <TextInput
    style={[styles.input, style, !valid && touched ? styles.invalid : null]}
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
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red'
  }
});

export default DefaultInput;
