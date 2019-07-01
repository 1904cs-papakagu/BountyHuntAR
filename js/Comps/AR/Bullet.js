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
        materials={['grid']}
        physicsBody={{
          type: 'Dynamic',
          mass: 15,
          force: { value: this.props.force },
          friction: 1,
          useGravity: true
        }}
        ref={'boxBullet'}
        viroTag={'boxBullet'}
      />
    );
  }
}
