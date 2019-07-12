import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  YellowBox,
  Button,
  TouchableOpacity,
  Modal
} from 'react-native';

import { connect } from 'react-redux';

import { ViroARSceneNavigator } from 'react-viro';

import Crosshair from './js/Comps/AR/Crosshair';

import { keyRing } from './secrets.js';

import Loading from './Loading';
import { setShooting, resetStatus, setBullets, reloading, setLoading } from './js/store';

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
      worldAlignment="Gravity"
      debug={true}
    />

    <Crosshair crosshair={props.crosshairId} />

    <View style={styles.reloadContainer}>
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={() => {
          props.setReload(true);
          setTimeout(() => {
            props.setBullets(7);
            props.setReload(false);
          }, 3000);
        }}
      >
        <Text style={styles.textStyle}>
          {!props.bullets && !props.reloading ? 'Tap To Reload' : ''}
        </Text>

        {props.reloading ? (
          <Text style={styles.textStyle}>RELOADING</Text>
        ) : (
          <></>
        )}

        {props.bullets && !props.reloading ? (
          <Text style={styles.textStyle}>Ammo: {props.bullets}/7</Text>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>

    <View style={styles.abandonContainer}>
      <TouchableOpacity
        onPress={() => {
          props.exitGame();
        }}
        style={styles.abandonButton}
      >
        <Text style={styles.textStyle}>Abandon Contract</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.shootContainer}>
      <TouchableOpacity onPress={props.fire} style={styles.shootButton}>
        <Text style={styles.textStyle}>SHOOT</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const mapStateToProps = state => {
  return {
    crosshairId: state.user.crosshairId,
    bullets: state.game.bullets,
    reloading: state.game.reloading,
    loading: state.game.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fire() {
      dispatch(setShooting());
    },
    setLoading(bool) {
      dispatch(setLoading(bool));
    },
    exitGame(){
      dispatch(resetStatus())
    },
    setBullets(n){
      dispatch(setBullets(n))
    },
    setReload(isReloading){ 
      dispatch(reloading(isReloading))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  reloadContainer: {
    width: width / 2,
    height: 50,
    position: 'absolute'
  },
  reloadButton: {
    height: 75,
    width: 150,
    backgroundColor: '#00000050',
    borderColor: '#ff0000',
    borderWidth: 2,
    borderRadius: 12,
    margin: 20,
    padding: 12
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'American Typewriter',
    fontSize: 20,
    color: 'white'
  },
  abandonContainer: {
    width: width / 2,
    height: 50,
    position: 'absolute',
    left: width / 1.9
  },
  abandonButton: {
    height: 75,
    width: 150,
    backgroundColor: '#00000050',
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
    bottom: 75
  },
  shootButton: {
    height: 100,
    width: 100,
    backgroundColor: '#ff000075',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 50,
    margin: 20,
    padding: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
