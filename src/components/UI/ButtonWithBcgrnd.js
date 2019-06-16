import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback
} from 'react-native';

const ButtonWithBcgrnd = ({ onPress, children, color, disabled }) => {
  const content = (
    <View style={[styles.button, { backgroundColor: color }, disabled ? styles.disabled : null]}>
      <Text style={disabled ? styles.disabledText : null}>{children}</Text>
    </View>
  );
  if (disabled) {
    return content;
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightblue'
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledText: {
    color: '#aaa'
  }
});

export default ButtonWithBcgrnd;
