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
import { setInActiveThunk } from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';

export default class ARScene extends Component {
  constructor() {
    super();
    this.state = {
      shoot: true,
      score: 0,
      displacement: [0, -2]
    };
    this.velocity = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.rot = [0, 0, 0];
    this.bullets = [];
    // method binds
    this._onInitialized = this._onInitialized.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
    this.boxShoot = this.boxShoot.bind(this);
    this.boxCollide = this.boxCollide.bind(this);
    this.getForce = this.getForce.bind(this);
  }

  // NOTE: setState will cause a re-render!!!
  async getForce() {
    const {
      forward,
      position,
      rotation
    } = await this.refs.scene.getCameraOrientationAsync();
    this.velocity = forward.map(vector => 15 * vector);
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
        position={this.pos}
        velocity={this.velocity}
        rotation={this.rot}
      />
    );
  }

  boxCollide(tag) {
    if (tag === 'boxBullet') {
      this.setInActive(this.props.location.id);
      const score = this.state.score + 1;
      this.setState({ score });
    }
  }

  render() {
    return (
      <ViroARScene
        ref="scene"
        onTrackingUpdated={this._onInitialized}
        postProcessEffects={['']}
        onCameraTransformUpdate={this.boxFollow}
        onClick={this.getForce}
      >
        {this.bullets}

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
          boxCollide={this.boxCollide}
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

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/BG.png')
  }
});

ViroAnimations.registerAnimations({
  spinBox: {
    properties: {
      rotateX: '+=90',
      rotateY: '+=90',
      rotateZ: '+=90'
    },
    duration: 500
  }
});

// STYLESHEETS

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 60,
    color: '#ffaaaf',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
const mapDispatchToProps = dispatch => {
  return {
    setInActive: id => dispatch(setInActiveThunk(id))
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ARScene);
