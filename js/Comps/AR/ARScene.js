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
  ViroARCamera,
  ViroSpotLight,
  ViroAmbientLight
} from 'react-viro';

import { connect } from 'react-redux';

import Geolocation from 'react-native-geolocation-service';
import { setInActiveThunk } from '../../store/';
import Targets from './Targets';
import Walls from './Walls';

export default class ARScene extends Component {
  constructor() {
    super();

    // set initial state here
    this.state = {
      shoot: false,
      score: 0,
      displacement: [0, -2] // temporary value for dev
    };

    // custom constants
    this.force = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.rot = [0, 0, 0];

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
    this.force = forward.map(c => 8000 * c);
    this.pos = position;
    this.rot = rotation;
    this.setState({ shoot: true });
    setTimeout(() => this.setState({ shoot: false }), 1500);
  }

  boxShoot() {
    return (
      <ViroBox
        position={this.pos}
        rotation={this.rot}
        height={0.5}
        width={0.5}
        length={0.8}
        materials={['grid']}
        physicsBody={{
          type: 'Dynamic',
          mass: 15,
          force: { value: this.force },
          friction: 1,
          useGravity: true
        }}
        ref={'boxBullet'}
        viroTag={'boxBullet'}
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
        {this.state.shoot ? this.boxShoot() : <></>}

        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Targets boxCollide={this.boxCollide} displacement={this.state.displacement} />
        <Walls />
      </ViroARScene>
    );
  }

  // DOCUMENTATION HAS IT AS if (state == ...) BUT I CHANGED IT TO STRICTLY EQUALS
  // https://docs.viromedia.com/docs/viroarscene
  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      // get user location
      console.log('STATE === ViroConstants.TRACKING_NORMAL');
      this._updateLocation();
      // calculate displacement
      // spawn a target
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
      console.log('STATE === ViroConstants.TRACKING_NONE');
    }
  }

  _updateLocation() {
    console.log('NOW INSIDE ARSCENE.JS _UPDATELOCATION!');
    Geolocation.getCurrentPosition(
      position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        const {targetLatitude, targetLongitude} = this.props.location;

        console.log('CURRENTLATITUDE:', currentLatitude);
        console.log('CURRENTLONGITUDE:', currentLongitude);
        console.log('TARGETLATITUDE:', targetLatitude);
        console.log('TARGETLONGITUDE:', targetLongitude);

        const displacement = [
          (targetLatitude - currentLatitude) * 111111,
          (targetLongitude - currentLongitude) * 111111 * Math.cos(Math.PI * targetLatitude / 180),
        ];

        console.log('DISPLACEMENT IN METERS:', displacement);

        this.setState({displacement});
        console.log('POSITION:', position);
      },
      error => {
        console.log('ERR0R:', error.message);
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
