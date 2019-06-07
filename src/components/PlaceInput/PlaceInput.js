import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PlaceInput = ({ onPlaceAdded }) => {
  const [placeName, setPlaceName] = useState('');

  placeSubmitHandler = () => {
    if (placeName.trim() === '') {
      return;
    }
    onPlaceAdded(placeName);
    // setPlaceName('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="An awesome place"
        value={placeName}
        onChangeText={(val) => setPlaceName(val)}
        style={styles.placeInput}
      />
      <Button
        title="Add"
        style={styles.placeButton}
        onPress={placeSubmitHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default PlaceInput

