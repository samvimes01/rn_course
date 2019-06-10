import React from 'react';
import DefaultInput from '../UI/DefaultInput';

const PlaceInput = ({ placeName, onChangeText }) => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={placeName}
      onChangeText={onChangeText}
    />
  );
};

export default PlaceInput;
