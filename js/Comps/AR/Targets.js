import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const positions = [
  {
    position: [-3, 0, -10]
  },
  {
    position: [10, 0, 8]
  },
  {
    position: [5, 0, -2]
  },
  {
    position: [-20, 0, -18]
  },
  {
    position: [3, 0, 18]
  },
  {
    position: [-10, 0, -16]
  }
];

const Targets = props => {

  const [x, z] = props.displacement;

  return ([

    <ViroBox
      key={0}
      position={[-x, 0, z]} // negating x to make Viro and GPS signal agree on coordinates
      height={2.0}
      width={0.4}
      length={0.4}
      materials={['target']}
      physicsBody={{
        type: 'Dynamic',
        mass: 1,
        useGravity: true
      }}
      onCollision={props.hitTarget}
      viroTag="target"
    />,
    ...positions.map((target, i) => (
      <ViroBox
        key={i+1}
        position={target.position}
        height={2}
        width={.4}
        length={.4}
        materials={['dummy']}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          useGravity: true
        }}
        onCollision={props.hitCiv}
      />
    ))
  ])
};

export default Targets;

