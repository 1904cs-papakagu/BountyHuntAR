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
        <Text style={styles.buttonText}>{props.bullets}/7</Text>
      </TouchableOpacity>
    </View>

    <ViroARSceneNavigator
      {...sharedProps}
      initialScene={{ scene: require('./js/Comps/AR/ARScene.js') }}
      worldAlignment="GravityAndHeading"
      debug={true}
    />

    <Crosshair crosshair={props.crosshairId} />
    {/* <Button  title="Shoot" color="#00ff00" /> */}
    <Button onPress={props.exitGame} title="Abandon Contract" color="#841584" />
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
    height: 50,
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  reloadButton: {
    width: 150,
    height: 50,
    borderColor: '#ff0000',
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20
  }
});
