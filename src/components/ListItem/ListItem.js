import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';

const listItem = ({ placeName, placeImage, onItemSelected }) => (
  <TouchableOpacity onPress={onItemSelected}>
    <View style={styles.listItem}>
      <Image source={placeImage} resizeMode="contain" style={styles.placeImage} />
      <Text>{placeName}</Text>
    </View>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default listItem;
