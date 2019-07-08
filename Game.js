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
  <View style={{ flex: 1 }}>
    <View style={styles.reloadContainer}>
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={() => {
          setTimeout(() => props.setBullets(7), 3000);
        }}
      >
        <Text style={styles.textStyle}>Reload</Text>
        <Text style={styles.textStyle}>{props.bullets}/7</Text>
      </TouchableOpacity>
    </View>

    <ViroARSceneNavigator
      {...sharedProps}
      initialScene={{ scene: require('./js/Comps/AR/ARScene.js') }}
      worldAlignment="GravityAndHeading"
      debug={true}
    />

    <Crosshair crosshair={props.crosshairId} />

    <View style={styles.abandonContainer}>
      <TouchableOpacity onPress={props.exitGame} style={styles.abandonButton}>
        <Text style={styles.textStyle}>Abandon Contract</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Game;

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  reloadContainer: {
    width: width,
    height: 150,
    justifyContent: 'flex-start',
    backgroundColor: '#000000'
  },
  reloadButton: {
    height: 100,
    backgroundColor: '#000000',
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 12,
    margin: 20,
    padding: 12,
    textAlign: 'center'
  },
  textStyle: {
    fontFamily: 'American Typewriter',
    fontSize: 25,
    color: 'white'
  },
  abandonContainer: {
    width: width,
    height: 0,
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  abandonButton: {
    height: 100,
    backgroundColor: '#000000',
    borderColor: '#841584',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    margin: 20,
    padding: 12,
    textAlign: 'center'
  }
});
