import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = ({ selectedPlace, onModalClosed, onItemDeleted }) => {
  let modalContent = null;

  if (selectedPlace) {
    modalContent = (
      <View>
        <Image source={selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={onModalClosed}
      visible={selectedPlace !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={onItemDeleted} >
            <View style={styles.deleteBtn} >
              <Icon size={30} name='ios-trash' color='red' />
            </View>
          </TouchableOpacity>
          <Button title="Close" onPress={onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteBtn: {
    alignItems: 'center'
  }
});

export default PlaceDetail;