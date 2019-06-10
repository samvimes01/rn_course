import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback
} from 'react-native';

const ButtonWithBcgrnd = ({ onPress, children, color }) => {
  const content = (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Text>{children}</Text>
    </View>
  );
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
  }
});

export default ButtonWithBcgrnd;
