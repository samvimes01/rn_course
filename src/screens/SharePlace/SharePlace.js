import React, { useState } from 'react';
import {
  View, Button, StyleSheet, ScrollView, Dimensions, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utils/validation';

import { savePlace } from '../../store/places';

// eslint-disable-next-line no-shadow
export const SharePlace = ({ savePlace, isLoading }) => {
  const [location, setLocation] = useState({
    value: {
      latitude: 50.0077151,
      longitude: 36.2444387,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
    },
    isPicked: false,
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

  const placeAddedHandler = () => { savePlace(placeName.value, location.value, image.value); };

  const locationPickedHandler = loc => setLocation({ value: loc, isPicked: true, valid: true });

  const imagePickedHandler = img => setImage({ value: img, valid: true });

  let submitBtn = <Button title="Share the Place!" onPress={placeAddedHandler} disabled={!placeName.valid || !location.valid || !image.valid} />;
  if (isLoading) {
    submitBtn = <ActivityIndicator />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage image={image.value} onImagePicked={imagePickedHandler} />
        <PickLocation location={location} onLocationPick={locationPickedHandler} />
        <PlaceInput placeData={placeName} onChangeText={placeNameChangedHandler} />
        <View style={styles.button}>{submitBtn}</View>
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

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
});

export default connect(mapStateToProps, { savePlace })(SharePlace);
