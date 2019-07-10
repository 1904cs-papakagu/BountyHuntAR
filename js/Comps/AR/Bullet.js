import React from 'react';

import { ViroSphere } from 'react-viro';

export default props => {
  return (
    <ViroSphere
      position={props.position}
      rotation={props.rotation}
      radius={0.05}
      materials={['black']}
      physicsBody={{
        type: 'Dynamic',
        mass: 15,
        shape: { type: 'Sphere', params: [0.05] },
        velocity: props.velocity,
        useGravity: false
      }}
      onCollision={props.killAgent}
      viroTag={'bullet'}
    />
  );
}
 