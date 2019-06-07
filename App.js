import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/places';

const App = ({ places, selectedPlace, addPlace, deletePlace, selectPlace, deselectPlace }) => {
  return (
    <View style={styles.container}>
      <PlaceDetail
        selectedPlace={selectedPlace}
        onItemDeleted={deletePlace}
        onModalClosed={deselectPlace}
      />
      <PlaceInput onPlaceAdded={ name => addPlace(name) } />
      <PlaceList places={ places } onItemSelected={selectPlace} />
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

const mapStateToProps = state => ({
  places: state.places.places,
  selectedPlace: state.places.selectedPlace
})

export default  connect(mapStateToProps, { addPlace, deletePlace, selectPlace, deselectPlace })(App);