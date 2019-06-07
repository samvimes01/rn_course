import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';

const App = () => {
  const [places, setPlaces] = useState([]);
  return (
    <View style={styles.container}>
      <PlaceInput onPlaceAdded={ value => setPlaces(places.concat({key: Math.random().toString(), value})) } />
      <PlaceList places={ places } onItemDelete={(id) => setPlaces(places.filter(place => place.key !== id))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default  App;