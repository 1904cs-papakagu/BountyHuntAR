import React, { Component } from 'react';

import { ViroBox } from 'react-viro';

export default props => {
  return (
    <ViroBox
      position={props.position}
      rotation={props.rotation}
      height={0.5}
      width={0.5}
      length={0.8}
      materials={['dummy']}
      physicsBody={{
        type: 'Dynamic',
        mass: 15,
        velocity: props.velocity,
        useGravity: true
      }}
      viroTag={'boxBullet'}
    />
  );
}
 