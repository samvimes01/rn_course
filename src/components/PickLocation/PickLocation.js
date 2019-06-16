import React, { useState, useRef } from 'react';
import {
  View, Button, StyleSheet, Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

const PickLocation = ({ onLocationPick }) => {
  const map = useRef(null);
  const [locChosen, setLocChosen] = useState(false);
  const [location, setLocation] = useState({
    latitude: 50.0077151,
    longitude: 36.2444387,
    latitudeDelta: 0.0122,
    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
  });

  const pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    map.current.animateToRegion({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    setLocation({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    setLocChosen(true);
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
      alert("Fetching the Position failed, please pick one manually!");
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
        {locChosen && <MapView.Marker coordinate={location} />}
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
