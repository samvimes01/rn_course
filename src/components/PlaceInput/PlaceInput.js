import React from 'react';
import DefaultInput from '../UI/DefaultInput';

const PlaceInput = ({ placeData: { value, valid, touched }, onChangeText }) => (
  <DefaultInput
    placeholder="Place Name"
    value={value}
    valid={valid}
    touched={touched}
    onChangeText={onChangeText}
  />
);

export default PlaceInput;
