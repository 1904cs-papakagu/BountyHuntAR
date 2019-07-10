'use strict';

import React, { Component } from 'react';
import { StyleSheet, Platform, Vibration } from 'react-native';
import {
  ViroARScene,
  ViroConstants,
  ViroMaterials,
  ViroAnimations,
  ViroSpotLight,
  ViroAmbientLight,
  ViroSound
} from 'react-viro';

import { connect } from 'react-redux';

import Geolocation from 'react-native-geolocation-service';
import {
  setInactiveThunk,
  endGame,
  setBullets,
  resetShooting,
  setShooting,
  toggleShot,
  setLoading
} from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';
import Loading from '../../../Loading';
export default class ARScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      displacement: [0, -10],
      update: true,
      reloading: false,
      report: false,
      targetDeathSound: false,
      guardDeathSound: false,
      civDeathSound: false,
    };

    this.bullets = [];

    this._onInitialized = this._onInitialized.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
    this.generateBullet = this.generateBullet.bind(this);
    this.hitTarget = this.hitTarget.bind(this);
    this.hitCiv = this.hitCiv.bind(this);
    this.hitGuard = this.hitGuard.bind(this);
    this.fire = this.fire.bind(this);
    this.stopShotSound = this.stopShotSound.bind(this);
    this.stopTargetDeathSound = this.stopTargetDeathSound.bind(this);
    this.stopGuardDeathSound = this.stopGuardDeathSound.bind(this);
    this.stopCivDeathSound = this.stopCivDeathSound.bind(this);
  }

  hitTarget(tag) {
    if (tag === 'bullet') {
      this.setState({ targetDeathSound: true });
      const score = this.state.score + 3;
      const { userId, locationId } = this.props;
      this.props.setInactive(locationId, userId, score);
      setTimeout(this.props.winGame, 2000);
    }
  }

  hitGuard(tag) {
    if (tag === 'bullet') {
      this.setState({ guardDeathSound: true });
      const score = this.state.score - 1;
      this.setState({ score });
    }
  }

  hitCiv(tag) {
    if (tag === 'bullet') {
      this.setState({ civDeathSound: true });
      const score = this.state.score - 3;
      this.setState({ score });
    }
  }


  stopShotSound() {
    this.setState({ report: false });
  }

  stopTargetDeathSound() {
    this.setState({ targetDeathSound: false })
  }

  stopGuardDeathSound() {
    this.setState({ guardDeathSound: false });
  }

  stopCivDeathSound() {
    this.setState({ civDeathSound: false });
  }


  fire({ position, rotation, forward }) {
    if (this.props.canShoot && this.props.shooting && this.props.bullets > 0) {
      this.props.toggleShot();
      this.setState({ report: true });
      Vibration.vibrate(250);
      const velocity = forward.map(vector => 30 * vector);
      const newCount = this.props.bullets - 1;
      this.bullets.push(this.generateBullet(position, rotation, velocity));
      this.props.setBullets(newCount);
      this.props.reset();
      setTimeout(() => this.props.toggleShot(), 3500);
      setTimeout(() => this.bullets.unshift(), 1500);
    }
  }

  generateBullet(position, rotation, velocity) {
    return (
      <Bullet
        key={this.bullets.length}
        position={position}
        velocity={velocity}
        rotation={rotation}
      />
    );
  }


  render() {
    return (
      <ViroARScene
        ref="scene"
        onTrackingUpdated={this._onInitialized}
        postProcessEffects={['']}
        onCameraTransformUpdate={this.fire}
      >
        <ViroSound
          source={require('./rising-tide-by-kevin-macleod.mp3')}
          loop={true}
          volume={0.5}
        />
        <ViroSound
          source={require('./audio/shot.mp3')}
          loop={true}
          paused={!this.state.report}
          volume={0.5}
          onFinish={this.stopShotSound}
        />
        <ViroSound
          source={require('./audio/casing.mp3')}
          loop={true}
          paused={!this.state.report}
          volume={0.5}
        />
        <ViroSound
          source={require('./audio/targetDeath.mp3')}
          loop={true}
          paused={!this.state.targetDeathSound}
          volume={0.5}
          onFinish={this.stopTargetDeathSound}
        />
        <ViroSound
          source={require('./audio/death.mp3')}
          loop={true}
          paused={!this.state.guardDeathSound}
          volume={0.5}
          onFinish={this.stopGuardDeathSound}
        />
        <ViroSound
          source={require('./audio/wilhelm.mp3')}
          loop={true}
          paused={!this.state.civDeathSound}
          volume={0.5}
          onFinish={this.stopCivDeathSound}
        />
        <ViroSound
          source={require('./audio/reload.mp3')}
          loop={true}
          paused={!this.props.reloading}
          volume={1.0}
        />
        {this.bullets}
        <ViroAmbientLight color="#aaaaaa" />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Targets
          hitTarget={this.hitTarget}
          hitGuard={this.hitGuard}
          hitCiv={this.hitCiv}
          displacement={this.state.displacement}
          setLoading={this.props.setLoading}
        />
        <Walls />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this._updateLocation();
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _updateLocation() {
    if (Platform.OS !== 'android') {
      Geolocation.getCurrentPosition(
        position => {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          const { targetLatitude, targetLongitude } = this.props.location;
          const displacement = [
            (targetLatitude - currentLatitude) * 111111,
            (targetLongitude - currentLongitude) *
            111111 *
            Math.cos((Math.PI * targetLatitude) / 180)
          ];
          this.setState({ displacement });
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 3600000
        }
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInactive: (locationId, userId, score) => {
      dispatch(setInactiveThunk(locationId, userId, score));
    },
    winGame() {
      dispatch(endGame(true));
    },
    setBullets(bullets) {
      dispatch(setBullets(bullets));
    },
    reset() {
      dispatch(resetShooting())
    },
    setShooting() {
      dispatch(setShooting())
    },
    toggleShot() {
      dispatch(toggleShot())
    },
    setLoading(bool) {
      dispatch(setLoading(bool));
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location,
    userId: state.user.id,
    locationId: state.location.id,
    bullets: state.game.bullets,
    reloading: state.game.reloading,
    shooting: state.game.shooting,
    canShoot: state.game.canShoot,
  };
};

const ConnectedARScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(ARScene);

module.exports = () => <ConnectedARScene />;

ViroMaterials.createMaterials({
  dummy: {
    diffuseTexture: require('./res/dummy.png')
  },
  black: {
    diffuseTexture: require('./res/black.png')
  },
  finnBenRodriguez: {
    diffuseTexture: require('./res/Finn/Finn-ben-rodriguez.png')
  },
  finnDavidPatlut: {
    diffuseTexture: require('./res/Finn/Finn-david-patlut.png')
  },
  finnDavidYang: {
    diffuseTexture: require('./res/Finn/Finn-david-yang.png')
  },
  target: {
    diffuseTexture: require('./res/target.png')
  }
});

ViroAnimations.registerAnimations({
  rMove1X1: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove1Z1: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove1X2: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove1Z2: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove1X3: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove1Z3: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  wander1: [
    ['rMove1X1', 'rMove1Z1', 'rMove1X2', 'rMove1Z2', 'rMove1X3', 'rMove1Z3']
  ],

  rMove2X1: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove2Z1: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove2X2: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove2Z2: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove2X3: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove2Z3: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  wander2: [
    ['rMove2X1', 'rMove2Z1', 'rMove2X2', 'rMove2Z2', 'rMove2X3', 'rMove2Z3']
  ],

  rMove3X1: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove3Z1: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove3X2: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove3Z2: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  rMove3X3: {
    properties: { positionX: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },
  rMove3Z3: {
    properties: { positionZ: `+=${Math.random() * 2 - 1}` },
    duration: 1000
  },

  wander3: [
    ['rMove3X1', 'rMove3Z1', 'rMove3X2', 'rMove3Z2', 'rMove3X3', 'rMove3Z3']
  ],

  pMoveTX1: { properties: { positionX: '+=10' }, duration: 10000 },
  pMoveTZ1: { properties: { positionZ: '+=10' }, duration: 10000 },
  pMoveTX2: { properties: { positionX: '-=10' }, duration: 10000 },
  pMoveTZ2: { properties: { positionZ: '-=10' }, duration: 10000 },

  patrolT: [['pMoveTX1', 'pMoveTZ1', 'pMoveTX2', 'pMoveTZ2']],

  pMoveGX1: { properties: { positionX: '+=10' }, duration: 10000 },
  pMoveGZ1: { properties: { positionZ: '+=10' }, duration: 10000 },
  pMoveGX2: { properties: { positionX: '-=10' }, duration: 10000 },
  pMoveGZ2: { properties: { positionZ: '-=10' }, duration: 10000 },

  patrolG: [['pMoveGX1', 'pMoveGZ1', 'pMoveGX2', 'pMoveGZ2']]
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 60,
    color: '#ffaaaf',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
