import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  YellowBox
} from 'react-native';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import { ViroARSceneNavigator } from 'react-viro';

import { keyRing } from './secrets.js';

var sharedProps = {
  apiKey: keyRing[Math.floor(Math.random() * 4)]
};

const Game = props => (
  <View style={{ flex: 1 }}>
    <ViroARSceneNavigator
      {...sharedProps}
      initialScene={{ scene: require('./js/Comps/AR/ARScene.js') }}
      worldAlignment="GravityAndHeading"
      debug={true}
    />
    {/* crosshair is its own view, following a stylesheet */}
    <View
      style={{
        ...styles.crosshairV1,
        top: styles.crosshairV1.top - 50,
        left: styles.crosshairV1.left - 1
      }}
    />
    <View
      style={{
        ...styles.crosshairH1,
        top: styles.crosshairV1.top - 1,
        left: styles.crosshairV1.left - 50
      }}
    />
    <View
      style={{
        ...styles.crosshairV2,
        top: styles.crosshairV2.top - 50,
        left: styles.crosshairV2.left - 2
      }}
    />
    <View
      style={{
        ...styles.crosshairV2,
        top: styles.crosshairV2.top + 25,
        left: styles.crosshairV2.left - 2
      }}
    />
    <View
      style={{
        ...styles.crosshairH2,
        top: styles.crosshairV2.top - 2,
        left: styles.crosshairV2.left - 50
      }}
    />
    <View
      style={{
        ...styles.crosshairH2,
        top: styles.crosshairV2.top - 2,
        left: styles.crosshairV2.left + 25
      }}
    />
    <View style={styles.crosshairCircle} />
  </View>
);

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  crosshairCircle: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 50,
    left: Dimensions.get('window').width / 2 - 50,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#a10d0d'
  },
  crosshairV1: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    height: 100,
    width: 2,
    backgroundColor: '#a10d0d'
  },
  crosshairH1: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    height: 2,
    width: 100,
    backgroundColor: '#a10d0d'
  },
  crosshairV2: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    height: 25,
    width: 4,
    backgroundColor: '#a10d0d'
  },
  crosshairH2: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    height: 4,
    width: 25,
    backgroundColor: '#a10d0d'
  }
});
