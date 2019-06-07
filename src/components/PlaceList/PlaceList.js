import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../ListItem/ListItem';

const PlaceList = ({ places, onItemSelected }) => {
  return (
    <FlatList 
      style={styles.listContainer}
      data={places}
      renderItem={({item}) => (
        <ListItem placeName={item.name} placeImage={item.image} onItemSelected={() => onItemSelected(item.key)} />
      )}
    />
    )
  
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default PlaceList
