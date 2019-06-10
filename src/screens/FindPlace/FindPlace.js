import React, { useState } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Animated, Text
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

const FindPlace = ({ places, componentId }) => {
  const [placesLoaded, setPlaceLoaded] = useState(false);
  const removeAnim = new Animated.Value(1);
  const placesAnim = new Animated.Value(0);

  const placesLoadedHandler = () => {
    Animated.timing(placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const placesSearchHandler = () => {
    Animated.timing(removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setPlaceLoaded(true);
      placesLoadedHandler();
    });
  };

  let content = (
    <Animated.View
      style={{
        opacity: removeAnim,
        transform: [
          {
            scale: removeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 1]
            })
          }
        ]
      }}
    >
      <TouchableOpacity onPress={placesSearchHandler}>
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Find Places</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
  if (placesLoaded) {
    content = (
      <Animated.View
        style={{
          opacity: placesAnim
        }}
      >
        <PlaceList
          places={places}
          onItemSelected={key => Navigation.push(componentId, { component: { name: 'PlaceDetailScreen', passProps: { selectedPlace: places.find(place => place.key === key) } } })}
        />
      </Animated.View>
    );
  }

  return (
    <View style={placesLoaded ? null : styles.buttonContainer}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, null)(FindPlace);
