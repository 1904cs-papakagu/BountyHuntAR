'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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

import Targets from './Targets';
import Walls from './Walls';

export default class ARScene extends Component {
  constructor() {
    super();

    // set initial state here
    this.state = {
      shoot: false,
      score: 0
    };

    // custom constants
    this.force = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.rot = [0, 0, 0];

    // method binds
    this._onInitialized = this._onInitialized.bind(this);
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
        <ViroARCamera>
          <ViroText
            text={`${this.state.score}`}
            width={1}
            height={1}
            color="#ffaad0"
            position={[0, 1, -2]}
          />
        </ViroARCamera>
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Targets boxCollide={this.boxCollide} />
        <Walls />
      </ViroARScene>
    );
  }

  // DOCUMENTATION HAS IT AS if (state == ...) BUT I CHANGED IT TO STRICTLY EQUALS
  // https://docs.viromedia.com/docs/viroarscene
  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        ready: true
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
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

module.exports = ARScene;
