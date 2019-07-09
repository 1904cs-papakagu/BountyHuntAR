import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  YellowBox,
  Button,
  TouchableOpacity
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

import Crosshair, { numOfCrosshairs } from './js/Comps/AR/Crosshair';

import { keyRing } from './secrets.js';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

var sharedProps = {
  apiKey: keyRing[Math.floor(Math.random() * 4)]
};

const Game = props => (
  <View style={styles.container}>
    <ViroARSceneNavigator
      {...sharedProps}
      initialScene={{ scene: require('./js/Comps/AR/ARScene.js') }}
      worldAlignment="GravityAndHeading"
      debug={true}
    />

    <Crosshair crosshair={props.crosshairId} />

    <View style={styles.reloadContainer}>
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={() => {
          setTimeout(() => props.setBullets(7), 3000);
        }}
      >
        <Text style={styles.textStyle}>{props.bullets}/7</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.abandonContainer}>
      <TouchableOpacity onPress={props.exitGame} style={styles.abandonButton}>
        <Text style={styles.textStyle}>Abandon Contract</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.shootContainer}>
      <TouchableOpacity style={styles.shootButton}>
        <Text style={styles.textStyle}>SHOOT</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Game;

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  reloadContainer: {
    width: width / 2,
    height: 50,
    // justifyContent: 'space-around',
    position: 'absolute',
    // top: 25,

  },
  reloadButton: {
    height: 75,
    width: 150,
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 2,
    borderRadius: 12,
    margin: 20,
    padding: 12,
  },
  textStyle: {
    fontFamily: 'American Typewriter',
    fontSize: 20,
    color: 'white',

  },
  abandonContainer: {
    width: width / 2,
    height: 50,
    position: 'absolute',
    // justifyContent: 'space-around',
    // top: 25,
    left: width / 1.90,
  },
  abandonButton: {
    height: 75,
    width: 150,
    backgroundColor: '#000000',
    borderColor: '#841584',
    borderWidth: 2,
    borderRadius: 12,
    color: 'white',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  shootContainer: {
    width: width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 75,
  },
  shootButton: {
    height: 100,
    width: 100,
    backgroundColor: '#ff0000',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 50,
    margin: 20,
    padding: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
