import { Navigation } from 'react-native-navigation';
import React from 'react';
import {
  View, Image, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/places';

// eslint-disable-next-line no-shadow
const PlaceDetail = ({ selectedPlace, deletePlace, componentId }) => (
  <View style={styles.container}>
    <View>
      <Image source={selectedPlace.image} style={styles.placeImage} />
      <Text style={styles.placeName}>{selectedPlace.name}</Text>
    </View>
    <View>
      <TouchableOpacity
        onPress={() => {
          deletePlace(selectedPlace.key);
          Navigation.pop(componentId);
        }}
      >
        <View style={styles.deleteBtn}>
          <Icon size={30} name="ios-trash" color="red" />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteBtn: {
    alignItems: 'center'
  }
});

export default connect(null, { deletePlace })(PlaceDetail);
