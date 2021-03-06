import React from 'react';
import {
  View, Image, Button, StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const PickImage = ({ image, onImagePicked }) => {
  const pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 600, maxHeight: 400 }, (res) => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image source={image} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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

export default PickImage;
