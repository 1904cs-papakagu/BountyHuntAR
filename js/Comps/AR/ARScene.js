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
  ViroSpotLight,
  ViroAmbientLight
} from 'react-viro';

import { connect } from 'react-redux';

import Geolocation from 'react-native-geolocation-service';
import { setInactiveThunk, endGame, sendPosition } from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';

export default class ARScene extends Component {

  constructor() {
    super();

    this.state = {
      shoot: true,
      score: 0,
      displacement: [0, -10],
      update: true,
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
    this.agentUpdate = this.agentUpdate.bind(this)
  }

  async getForce() {

    const {
      forward,
      position,
      rotation
    } = await this.refs.scene.getCameraOrientationAsync();

    this.velocity = forward.map(vector => 30 * vector);
    this.pos = position;
    this.rot = rotation;

    if (this.state.shoot) {
      this.bullets.push(this.boxShoot());
      this.setState({ shoot: false });
    }

    setTimeout(() => this.setState({ shoot: true }), 1500);
    setTimeout(() => this.bullets.unshift(), 1500);
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

  hitTarget(tag) {

    if (tag === 'boxBullet') {
      const score = this.state.score + 3;
      const { userId, locationId } = this.props

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
        {Object.values(this.props.agents).map( (agent, index) => (
          <ViroBox
            key={index}
            height={2}
            width={.5}
            length={.5}
            position={agent}
            materials={['target']}
          />
        ))}
        <ViroAmbientLight color={'#aaaaaa'} />
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
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location,
    userId: state.user.id,
    locationId: state.location.id,
    agents: state.game.agents
  };
};

const ConnectedARScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(ARScene);

module.exports = () => (<ConnectedARScene />);


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

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 60,
    color: '#ffaaaf',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
