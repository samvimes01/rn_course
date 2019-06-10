import React, { useState } from 'react';
import {
  View, Button, StyleSheet, ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import { addPlace } from '../../store/places';

// eslint-disable-next-line no-shadow
export const SharePlace = ({ addPlace }) => {
  const [placeName, setPlaceName] = useState('');

  const placeNameChangedHandler = value => setPlaceName(value);

  const placeAddedHandler = () => {
    if (placeName.trim() !== '') {
      addPlace(placeName);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage />
        <PickLocation />
        <PlaceInput
          placeName={placeName}
          onChangeText={placeNameChangedHandler}
        />
        <View style={styles.button}>
          <Button title="Share the Place!" onPress={placeAddedHandler} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default connect(null, { addPlace })(SharePlace);
