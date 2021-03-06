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
  ViroSound,
  Viro3DObject,
  ViroCamera
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
  setLoading,
  updateTransform,
  killAgent,
  updateScoreThunk
} from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';
export default class ARScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displacement: [0, -10],
      report: false,
      targetDeathSound: false,
      guardDeathSound: false,
      civDeathSound: false
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
    this.onHitAgent = this.onHitAgent.bind(this);
  }

  hitTarget(tag) {
    if (tag === 'bullet') {
      this.setState({ targetDeathSound: true });
      this.props.score(this.props.userId, 3 + this.props.userScore);
      const { userId, locationId, userScore } = this.props;
      this.props.setInactive(locationId, userId, userScore);
      setTimeout(this.props.winGame, 2000);
    }
  }

  hitGuard(tag) {
    if (tag === 'bullet') {
      this.setState({ guardDeathSound: true });
      this.props.score(this.props.userId, -1 + this.props.userScore);
    }
  }

  hitCiv(tag) {
    if (tag === 'bullet') {
      this.setState({ civDeathSound: true });
      this.props.score(this.props.userId, -3 + this.props.userScore);
    }
  }

  stopShotSound() {
    this.setState({ report: false });
  }

  stopTargetDeathSound() {
    this.setState({ targetDeathSound: false });
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
    if (Date.now() % 1000 < 100) {
      updateTransform(this.props.locationId, this.props.userId, position);
    }
  }

  onHitAgent(tag) {
    if (Number(tag)) {
      // this.props.score(5);
      killAgent(this.props.locationId, tag);
    }
  }

  generateBullet(position, rotation, velocity) {
    return (
      <Bullet
        key={this.bullets.length}
        position={position}
        velocity={velocity}
        rotation={rotation}
        killAgent={this.onHitAgent}
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

        {Object.values(this.props.agents).map((agent, index) => {
          const { displacement, transform, id } = agent;
          return (
            <Viro3DObject
              key={index}
              source={require('./res/agent/Runner.unity_1.obj')}
              type="OBJ"
              materials={['orange']}
              scale={[0.4, 0.4, 0.4]}
              position={[
                transform[0] - displacement[0],
                0,
                transform[2] - displacement[2]
              ]}
              rotationPivot={[-0.5, 1, -0.5]}
              physicsBody={{
                type: 'Dynamic',
                mass: 1,
                useGravity: false
              }}
              viroTag={id}
            />
          );
        })}

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
      dispatch(resetShooting());
    },
    setShooting() {
      dispatch(setShooting());
    },
    toggleShot() {
      dispatch(toggleShot());
    },
    setLoading(bool) {
      dispatch(setLoading(bool));
    },
    score(userId, score) {
      dispatch(updateScoreThunk(userId, score));
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
    agents: state.game.agents,
    userScore: state.user.score
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
  white: {
    diffuseTexture: require('./res/white.png')
  },
  gray: {
    diffuseTexture: require('./res/gray.png')
  },
  blue: {
    diffuseTexture: require('./res/blue.png')
  },
  red: {
    diffuseTexture: require('./res/red.png')
  },
  orange: {
    diffuseTexture: require('./res/orange.png')
  },
  target: {
    diffuseTexture: require('./res/target.png')
  }
});

const mkWanderAnim = n => {
  let anim = {};
  for (let i = 1; i < 7; i++) {
    anim[`rMove${n}X${i}`] = {
      properties: { positionX: `+=${Math.random() * 2 - 1}` },
      duration: 1000
    };
    anim[`rMove${n}Z${i}`] = {
      properties: { positionZ: `+=${Math.random() * 2 - 1}` },
      duration: 1000
    };
  }
  const chain = new Array(12).fill('').map((e, i) => {
    let dir;
    if (i % 2) dir = 'X';
    else dir = 'Z';
    return `rMove${n}${dir}${Math.floor(i / 2) + 1}`;
  });
  anim[`wander${n}`] = [chain];
  return anim;
};

for (let i = 1; i < 4; i++) {
  ViroAnimations.registerAnimations(mkWanderAnim(i));
}

ViroAnimations.registerAnimations({
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
