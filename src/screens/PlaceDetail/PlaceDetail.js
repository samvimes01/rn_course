import { Navigation } from 'react-native-navigation';
import React, { useState, useEffect } from 'react';
import {
  View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/places';

// eslint-disable-next-line no-shadow
const PlaceDetail = ({ selectedPlace, deletePlace, componentId }) => {
  const [viewMode, setViewMode] = useState('portrait');

  const updateStyles = dims => setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape');

  useEffect(() => {
    Dimensions.addEventListener('change', updateStyles);
    return () => Dimensions.removeEventListener('change', updateStyles);
  });

  return (
    <View
      style={[
        styles.container,
        viewMode === 'portrait'
          ? styles.portraitContainer
          : styles.landscapeContainer
      ]}
    >
      <View style={styles.subContainer}>
        <Image source={selectedPlace.image} style={styles.placeImage} />
      </View>
      <View style={styles.subContainer}>
        <View>
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
              <Icon
                size={30}
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  subContainer: {
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
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
