import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  crosshair0: {
    position: 'absolute',
    backgroundColor: '#a10d0d'
  },
  crosshair1: {
    position: 'absolute',
    backgroundColor: 'black'
  },
  crosshair2: {
    position: 'absolute',
    backgroundColor: 'black'
  },
});

const crosshairs = [

  // CROSSHAIR 0
  [
    <View
      style={{
        ...styles.crosshair0,
        height: 100,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 1,
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 2,
        width: 100,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 50
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 2
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 + 25,
        left: SCREEN_WIDTH / 2 - 2
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 50
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 + 25
      }}
    />,
    <View
      style={{
        ...styles.crosshair0,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: '#a10d0d'
      }}
    />
  ],
  
  // CROSSHAIR 1
  [
    <View
      style={{
        ...styles.crosshair1,
        height: 35,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 60,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 35,
        width: 2,
        top: SCREEN_HEIGHT / 2 + 25,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 2,
        width: 35,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 60
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 2,
        width: 35,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 + 25
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: 'black'
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 80,
        width: 80,
        borderRadius: 1000,
        borderWidth: 2,
        top: SCREEN_HEIGHT / 2 - 40,
        left: SCREEN_WIDTH / 2 - 40,
        backgroundColor: '',
        borderColor: 'black'
      }}
    />,
    <View
      style={{
        ...styles.crosshair1,
        height: 4,
        width: 4,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 2,
      }}
    />
  ],


  // CROSSHAIR 2
  [
    <View
      style={{
        ...styles.crosshair2,
        height: 60,
        width: 2,
        top: SCREEN_HEIGHT / 2,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 2,
        width: 120,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 60
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 45
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 + 20
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 + 20,
        left: SCREEN_WIDTH / 2 - 2
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 2,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: 'black'
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 90,
        width: 90,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 45,
        left: SCREEN_WIDTH / 2 - 45,
        backgroundColor: '',
        borderColor: 'black'
      }}
    />,
    <View
      style={{
        ...styles.crosshair2,
        height: 4,
        width: 4,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: '#a10d0d'
      }}
    />
  ],

];

const Crosshair = props => {

  return (
    crosshairs[props.crosshair]
  )
};

export default Crosshair;