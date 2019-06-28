import React from 'react';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  ViroARCamera,
} from 'react-viro';

const targets = [
  {
    position: [10, 0, -16],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: false,
    },
  },
  {
    position: [-10, 0, -16],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: false,
    },
  },
];



const Targets = props => {
  return targets.map((target, i) => {
    return (
      <ViroBox
        position={target.position}
        height={target.height}
        width={target.width}
        length={target.length}
        materials={target.materials}
        physicsBody={target.physicsBody}
        onCollision={props.boxCollide}
        // ref={`box${i}`}
      />
    );
  });
};

export default Targets;