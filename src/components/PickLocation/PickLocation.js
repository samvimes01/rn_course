/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useRef } from 'react';
import {
  View, Button, StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

const PickLocation = ({ location: { value: location, isPicked }, onLocationPick }) => {
  const map = useRef(null);

  const pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    map.current.animateToRegion({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    onLocationPick({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      pickLocationHandler(coordsEvent);
    },
    (err) => {
      console.error(err);
      alert('Fetching the Position failed, please pick one manually!');
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={location}
        style={styles.map}
        onPress={pickLocationHandler}
        ref={map}
      >
        {isPicked && <MapView.Marker coordinate={location} />}
      </MapView>
      <View style={styles.button}>
        <Button title="Locate Me" onPress={getLocationHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
