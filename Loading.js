import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';

export default props => (
  <View style={styles.container}>
    <Image
      source={require('./js/Images/loadingtargets.png')}
      style={styles.loadingImage}
    />
    <ActivityIndicator animating={props.loading} />
  </View>
);

let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  loadingImage: {
    width: width,
    resizeMode: 'contain'
  }
});
