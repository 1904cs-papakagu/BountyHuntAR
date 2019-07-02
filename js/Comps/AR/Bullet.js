import React, { Component } from 'react';

import { ViroBox } from 'react-viro';

export default class Bullet extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ViroBox
        position={this.props.position}
        rotation={this.props.rotation}
        height={0.5}
        width={0.5}
        length={0.8}
        materials={['dummy']}
        physicsBody={{
          type: 'Dynamic',
          mass: 15,
          velocity: this.props.velocity,
          useGravity: true
        }}
        ref={'boxBullet'}
        viroTag={'boxBullet'}
      />
    );
  }
}
