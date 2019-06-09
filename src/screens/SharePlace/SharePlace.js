import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/places';

// eslint-disable-next-line no-shadow
export const SharePlace = ({ addPlace }) => (
  <View>
    <PlaceInput onPlaceAdded={placeName => addPlace(placeName)} />
  </View>
);

export default connect(null, { addPlace })(SharePlace);
