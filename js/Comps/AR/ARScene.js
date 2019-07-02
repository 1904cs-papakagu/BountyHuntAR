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
import { setInactiveThunk } from '../../store/';
import Targets from './Targets';
import Walls from './Walls';
import Bullet from './Bullet';

export default class ARScene extends Component {
  constructor() {
    super();
    this.state = {
      shoot: false,
      score: 0,
      displacement: [0, -2]
    };
    this.force = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.rot = [0, 0, 0];
    this.bullets = [];
    // method binds
    this._onInitialized = this._onInitialized.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
    this.boxShoot = this.boxShoot.bind(this);
    this.hitTarget = this.hitTarget.bind(this);
    this.hitCiv = this.hitCiv.bind(this);

    this.getForce = this.getForce.bind(this);
  }

  // NOTE: setState will cause a re-render!!!
  async getForce() {
    const {
      forward,
      position,
      rotation
    } = await this.refs.scene.getCameraOrientationAsync();
    this.force = forward.map(c => 8000 * c);
    this.pos = position;
    this.rot = rotation;
    this.bullets.push(this.boxShoot());
    this.setState({ shoot: true });
    setTimeout(() => this.bullets.unshift(), 1500);
  }

  boxShoot() {
    return (
      <Bullet position={this.pos} force={this.force} rotation={this.rot} />
    );
  }

  hitTarget(tag) {
    if (tag === 'boxBullet') {
      const score = this.state.score + 3;
      this.props.setInactive(this.props.uid, this.props.lid, score);
    }
  }

  hitCiv(tag) {
    if (tag === 'boxBullet') {
      const score = this.state.score - 1;
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

ViroMaterials.createMaterials({
  dummy: {
    diffuseTexture: require('./res/dummy.png')
  },
  target: {
    diffuseTexture: require('./res/target.png')
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
    setInactive: (uid, lid, score) => dispatch(setInactiveThunk(uid, lid, score))
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location,
    uid: state.user.id,
    lid: state.location.id
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ARScene);
