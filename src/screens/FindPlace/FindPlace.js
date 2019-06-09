import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

const FindPlace = ({ places, componentId }) => (
  <View>
    <PlaceList
      places={places}
      onItemSelected={key => Navigation.push(componentId, { component: { name: 'PlaceDetailScreen', passProps: { selectedPlace: places.find(place => place.key === key) } } })}
    />
  </View>
);

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, null)(FindPlace);
