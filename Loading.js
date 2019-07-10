import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';

export default props => (
  <View style={styles.container}>
    <Text>Loading in Target</Text>
    <ActivityIndicator animating={props.loading} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
