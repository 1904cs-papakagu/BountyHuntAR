'use strict';
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  ViroCamera,
  ViroSpotLight,
  ViroAmbientLight
} from 'react-viro';

import { connect } from 'react-redux';

import Geolocation from 'react-native-geolocation-service';
import { setInactiveThunk, endGame, sendPosition, setBullets } from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';

export default class ARScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoot: true,
      score: 0,
      displacement: [0, -10],
      update: true,
      reloading: false,
      magazine: 7
    };

    this.velocity = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.rot = [0, 0, 0];
    this.bullets = [];

    this._onInitialized = this._onInitialized.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
    this.boxShoot = this.boxShoot.bind(this);
    this.hitTarget = this.hitTarget.bind(this);
    this.hitCiv = this.hitCiv.bind(this);
    this.getForce = this.getForce.bind(this);
    this.agentUpdate = this.agentUpdate.bind(this);
    this.reload = this.reload.bind(this);
  }

  async getForce() {
    if (this.props.bullets) {
      const {
        forward,
        position,
        rotation
      } = await this.refs.scene.getCameraOrientationAsync();

      this.velocity = forward.map(vector => 30 * vector);
      this.pos = position;
      this.rot = rotation;

      if (this.state.shoot) {
        const newCount = this.props.bullets - 1;
        this.bullets.push(this.boxShoot());
        this.setState({ shoot: false, magazine: newCount });
        this.props.setBullets(newCount)
      }

      setTimeout(() => this.setState({ shoot: true }), 1500);
      setTimeout(() => this.bullets.unshift(), 1500);
    }
  }

  boxShoot() {
    return (
      <Bullet
        key={this.bullets.length}
        position={this.pos}
        velocity={this.velocity}
        rotation={this.rot}
      />
    );
  }
  reload() {
    this.setState({ reloading: true });
    setTimeout(() => this.setState({ magazine: 7, reloading: false }), 3000);
  }

  hitTarget(tag) {
    if (tag === 'boxBullet') {
      const score = this.state.score + 3;
      const { userId, locationId } = this.props;

      this.props.setInactive(locationId, userId, score);
      setTimeout(this.props.winGame, 2000);
    }
  }

  hitCiv(tag) {
    if (tag === 'boxBullet') {
      const score = this.state.score - 1;
      this.setState({ score });
    }
  }

  async agentUpdate() {
    if (this.state.update) {
      const { position } = await this.refs.scene.getCameraOrientationAsync();
      const { locationId, userId } = this.props;
      sendPosition(locationId, userId, position);
      this.setState({ update: false });
      setTimeout(() => this.setState({ update: true }), 500);
    }
  }

  render() {
    return (
      <ViroARScene
        ref="scene"
        onTrackingUpdated={this._onInitialized}
        postProcessEffects={['']}
        onCameraTransformUpdate={this.agentUpdate}
        onClick={this.getForce}
      >
        {this.bullets}
        {Object.values(this.props.agents).map((agent, index) => {
          const { displacement } = this.state;
          return (
            <ViroBox
              key={index}
              height={2}
              width={0.5}
              length={0.5}
              position={[
                agent[0] + displacement[0],
                agent[1],
                agent[2] + displacement[1]
              ]}
              materials={['target']}
            />
          );
        })}
        <ViroCamera position={[0, 0, 0]} active={true}>
          <ViroText
            text={
              this.state.reloading ? 'reloading' : String(this.state.magazine)
            }
            textAlign="left"
            textAlignVertical="top"
            textLineBreakMode="justify"
            textClipMode="clipToBounds"
            color="#ff0000"
            width={2}
            height={2}
            onClick={this.reload}
            style={{
              fontFamily: 'Arial',
              fontSize: 20,
              fontWeight: '400',
              fontStyle: 'italic',
              color: '#0000FF'
            }}
            position={[-0.5, 0.8, -5]}
          />
        </ViroCamera>
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
          hitCiv={this.hitCiv}
          displacement={this.state.displacement}
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
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location,
    userId: state.user.id,
    locationId: state.location.id,
    agents: state.game.agents,
    bullets: state.game.bullets
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
  finn: {
    diffuseTexture: require('./res/Finn/Finn.png')
  },
  target: {
    diffuseTexture: require('./res/target.png')
  }
});

ViroAnimations.registerAnimations({
  rMove1X1: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove1Z1: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

  rMove1X2: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove1Z2: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

  rMove1X3: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove1Z3: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

  wander1: [
   ['rMove1X1', 'rMove1Z1', 'rMove1X2', 'rMove1Z2', 'rMove1X3', 'rMove1Z3']
  ],

  rMove2X1: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove2Z1: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

  rMove2X2: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove2Z2: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

  rMove2X3: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
  rMove2Z3: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},


  wander2: [
    ['rMove2X1', 'rMove2Z1', 'rMove2X2', 'rMove2Z2', 'rMove2X3', 'rMove2Z3']
   ],

   rMove3X1: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
   rMove3Z1: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

   rMove3X2: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
   rMove3Z2: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},

   rMove3X3: {properties: {positionX: `+=${Math.random() * 2 - 1}`}, duration: 1000},
   rMove3Z3: {properties: {positionZ: `+=${Math.random() * 2 - 1}`}, duration: 1000},


   wander3: [
     ['rMove3X1', 'rMove3Z1', 'rMove3X2', 'rMove3Z2', 'rMove3X3', 'rMove3Z3']
    ],

   pMoveTX1: {properties: {positionX: '+=10'}, duration: 10000},
   pMoveTZ1: {properties: {positionZ: '+=10'}, duration: 10000},
   pMoveTX2: {properties: {positionX: '-=10'}, duration: 10000},
   pMoveTZ2: {properties: {positionZ: '-=10'}, duration: 10000},

   patrolT: [
    ['pMoveTX1', 'pMoveTZ1', 'pMoveTX2', 'pMoveTZ2']
   ],

   pMoveGX1: {properties: {positionX: '+=10'}, duration: 10000},
   pMoveGZ1: {properties: {positionZ: '+=10'}, duration: 10000},
   pMoveGX2: {properties: {positionX: '-=10'}, duration: 10000},
   pMoveGZ2: {properties: {positionZ: '-=10'}, duration: 10000},

   patrolG: [
    ['pMoveGX1', 'pMoveGZ1', 'pMoveGX2', 'pMoveGZ2']
   ],
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
