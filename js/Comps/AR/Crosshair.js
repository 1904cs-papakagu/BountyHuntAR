import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  crosshair0: {
    position: 'absolute',
    backgroundColor: 'black'
  },
  crosshair1: {
    position: 'absolute',
    backgroundColor: 'black'
  },
  crosshair2: {
    position: 'absolute',
    backgroundColor: 'black'
  },
  crosshair3: {
    position: 'absolute',
    backgroundColor: 'black'
  },
  crosshair4: {
    position: 'absolute',
    backgroundColor: 'black'
  },
});

export const crosshairs = [

  // CROSSHAIR 0: blue transparency with highlighted cross
  [
    <View
      key={0}
      style={{
        ...styles.crosshair1,
        height: 100,
        width: 100,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: "#00f9ff",
        opacity: 0.2
      }}
    />,
    <View
      key={1}
      style={{
        ...styles.crosshair0,
        height: 100,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 1,
        backgroundColor: "#00f9ff",
        opacity: 0.4
      }}
    />,
    <View
      key={2}
      style={{
        ...styles.crosshair0,
        height: 2,
        width: 100,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: "#00f9ff",
        opacity: 0.4
      }}
    />,
    <View
      key={3}
      style={{
        ...styles.crosshair0,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: "#00f9ff",
      }}
    />,
    <View
      key={4}
      style={{
        ...styles.crosshair0,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 + 25,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: "#00f9ff",
      }}
    />,
    <View
      key={5}
      style={{
        ...styles.crosshair0,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: "#00f9ff",
      }}
    />,
    <View
      key={6}
      style={{
        ...styles.crosshair0,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 + 25,
        backgroundColor: "#00f9ff",
      }}
    />,
    <View
      key={7}
      style={{
        ...styles.crosshair0,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: styles.crosshair0.backgroundColor
      }}
    />

  ],
  
  // CROSSHAIR 1: red dot sight and transparency with cross
  [
    <View
      key={0}
      style={{
        ...styles.crosshair1,
        height: 100,
        width: 100,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: 'red',
        opacity: 0.4
      }}
    />,
    <View
      key={1}
      style={{
        ...styles.crosshair1,
        height: 30,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 55,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      key={2}
      style={{
        ...styles.crosshair1,
        height: 30,
        width: 2,
        top: SCREEN_HEIGHT / 2 + 25,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      key={3}
      style={{
        ...styles.crosshair1,
        height: 2,
        width: 30,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 55
      }}
    />,
    <View
      key={4}
      style={{
        ...styles.crosshair1,
        height: 2,
        width: 30,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 + 25
      }}
    />,
    <View
      key={5}
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
      key={6}
      style={{
        ...styles.crosshair1,
        height: 80,
        width: 80,
        borderRadius: 1000,
        borderWidth: 2,
        top: SCREEN_HEIGHT / 2 - 40,
        left: SCREEN_WIDTH / 2 - 40,
        backgroundColor: '',
        borderColor: 'red'
      }}
    />,
    <View
      key={7}
      style={{
        ...styles.crosshair1,
        height: 4,
        width: 4,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: 'red'
      }}
    />
  ],


  // CROSSHAIR 2: green transparency with black cross
  [
    <View
      key={0}
      style={{
        ...styles.crosshair2,
        height: 90,
        width: 90,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 45,
        left: SCREEN_WIDTH / 2 - 45,
        opacity: 0.3
      }}
    />,
    <View
      key={1}
      style={{
        ...styles.crosshair2,
        height: 60,
        width: 2,
        top: SCREEN_HEIGHT / 2,
        left: SCREEN_WIDTH / 2 - 1
      }}
    />,
    <View
      key={2}
      style={{
        ...styles.crosshair2,
        height: 2,
        width: 120,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 60
      }}
    />,
    <View
      key={3}
      style={{
        ...styles.crosshair2,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 45
      }}
    />,
    <View
      key={4}
      style={{
        ...styles.crosshair2,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 + 20
      }}
    />,
    <View
      key={5}
      style={{
        ...styles.crosshair2,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 + 20,
        left: SCREEN_WIDTH / 2 - 2
      }}
    />,
    <View
      key={6}
      style={{
        ...styles.crosshair2,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 2,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: styles.crosshair2.backgroundColor
      }}
    />,
    <View
      key={7}
      style={{
        ...styles.crosshair2,
        height: 90,
        width: 90,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 45,
        left: SCREEN_WIDTH / 2 - 45,
        backgroundColor: '',
        borderColor: styles.crosshair2.backgroundColor
      }}
    />,
    <View
      key={8}
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


  // CROSSHAIR 3: gray transparency with red dot sight and black T shape
  [
    <View
      key={0}
      style={{
        ...styles.crosshair3,
        height: 100,
        width: 100,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: 'green',
        opacity: 0.5
      }}
    />,
    <View
      key={1}
      style={{
        ...styles.crosshair3,
        height: 50,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 25,
        left: SCREEN_WIDTH / 2 - 1,
      }}
    />,
    <View
      key={2}
      style={{
        ...styles.crosshair3,
        height: 2,
        width: 50,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 25
      }}
    />,
    <View
      key={3}
      style={{
        ...styles.crosshair3,
        borderWidth: 1,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: '',
      }}
    />,
    <View
      key={4}
      style={{
        ...styles.crosshair3,
        borderWidth: 1,
        height: 25,
        width: 4,
        top: SCREEN_HEIGHT / 2 + 25,
        left: SCREEN_WIDTH / 2 - 2,
        backgroundColor: '',
      }}
    />,
    <View
      key={5}
      style={{
        ...styles.crosshair3,
        borderWidth: 1,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
      }}
    />,
    <View
      key={6}
      style={{
        ...styles.crosshair3,
        borderWidth: 1,
        height: 4,
        width: 25,
        top: SCREEN_HEIGHT / 2 - 2,
        left: SCREEN_WIDTH / 2 + 25,
        backgroundColor: '',
      }}
    />,
    <View
      key={7}
      style={{
        ...styles.crosshair3,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: styles.crosshair3.backgroundColor
      }}
    />
  ],

  // CROSSHAIR 4: yellow transparency with sniper bars
  [
    <View
      key={0}
      style={{
        ...styles.crosshair4,
        height: 100,
        width: 100,
        borderRadius: 1000,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: 'yellow',
        opacity: 0.5
      }}
    />,
    <View
      key={1}
      style={{
        ...styles.crosshair4,
        height: 100,
        width: 2,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 1,
      }}
    />,
    <View
      key={2}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 100,
        top: SCREEN_HEIGHT / 2 - 1,
        left: SCREEN_WIDTH / 2 - 50
      }}
    />,
    <View
      key={3}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 30,
        top: SCREEN_HEIGHT / 2 - 1 + 5,
        left: SCREEN_WIDTH / 2 - 15
      }}
    />,
    <View
      key={4}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 24,
        top: SCREEN_HEIGHT / 2 - 1 + 10,
        left: SCREEN_WIDTH / 2 - 12
      }}
    />,
    <View
      key={5}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 18,
        top: SCREEN_HEIGHT / 2 - 1 + 15,
        left: SCREEN_WIDTH / 2 - 9
      }}
    />,
    <View
      key={6}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 12,
        top: SCREEN_HEIGHT / 2 - 1 + 20,
        left: SCREEN_WIDTH / 2 - 6
      }}
    />,
    <View
      key={7}
      style={{
        ...styles.crosshair4,
        height: 2,
        width: 6,
        top: SCREEN_HEIGHT / 2 - 1 + 25,
        left: SCREEN_WIDTH / 2 - 3
      }}
    />,
    <View
      key={8}
      style={{
        ...styles.crosshair4,
        height: 100,
        width: 100,
        borderRadius: 1000,
        borderWidth: 4,
        top: SCREEN_HEIGHT / 2 - 50,
        left: SCREEN_WIDTH / 2 - 50,
        backgroundColor: '',
        borderColor: styles.crosshair4.backgroundColor
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

export const numOfCrosshairs = crosshairs.length;