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
import validate from '../../utils/validation';

import { addPlace } from '../../store/places';

// eslint-disable-next-line no-shadow
export const SharePlace = ({ addPlace }) => {
  const [location, setLocation] = useState({
    value: null,
    valid: false
  });
  const [image, setImage] = useState({
    value: null,
    valid: false
  });
  const [placeName, setPlaceName] = useState({
    value: '',
    valid: false,
    touched: false,
    validationRules: {
      notEmpty: true
    }
  });

  const placeNameChangedHandler = value => setPlaceName({
    ...placeName,
    value,
    valid: validate(value, placeName.validationRules),
    touched: true,
  });

  const placeAddedHandler = () => {
    addPlace(placeName.value, location.value, image.value);
  };

  const locationPickedHandler = loc => setLocation({ value: loc, valid: true });

  const imagePickedHandler = img => setImage({ value: img, valid: true });

  return (
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage onImagePicked={imagePickedHandler} />
        <PickLocation onLocationPick={locationPickedHandler} />
        <PlaceInput
          placeData={placeName}
          onChangeText={placeNameChangedHandler}
        />
        <View style={styles.button}>
          <Button title="Share the Place!" onPress={placeAddedHandler} disabled={!placeName.valid || !location.valid || !image.valid} />
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
