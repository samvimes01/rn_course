import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/places';

// eslint-disable-next-line no-shadow
const FindPlace = ({ places, getPlaces, componentId }) => {
  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View>
      <PlaceList
        places={places}
        onItemSelected={key => Navigation.push(componentId, { component: { name: 'PlaceDetailScreen', passProps: { selectedPlace: places.find(place => place.key === key) } } })}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, { getPlaces })(FindPlace);
