import React from 'react';
import { ViroBox } from 'react-viro';

const walls = [
  {
    position: [0, -2.5, 0],
    height: 0.5,
    width: 200,
    length: 200,
    physicsBody: {
      type: 'Static',
      friction: 1,
    },
    opacity: 0.0,
  },
  {
    position: [100, 45, 0],
    height: 100,
    width: 0.5,
    length: 200,
    physicsBody: {
      type: 'Static',
      friction: 1,
    },
    opacity: 0.0,
  },
  {
    position: [-100, 45, 0],
    height: 100,
    width: 0.5,
    length: 200,
    physicsBody: {
      type: 'Static',
      friction: 1,
    },
    opacity: 0.0,
  },
  {
    position: [0, 45, 100],
    height: 100,
    width: 200,
    length: 0.5,
    physicsBody: {
      type: 'Static',
      friction: 1,
    },
    opacity: 0.0,
  },
  {
    position: [0, 45, -100],
    height: 100,
    width: 200,
    length: 0.5,
    physicsBody: {
      type: 'Static',
      friction: 1,
    },
    opacity: 0.0,
  },
];

const Walls = props => {
  return walls.map((wall, i) => {
    return (
      <ViroBox
        key={i}
        position={wall.position}
        height={wall.height}
        width={wall.width}
        length={wall.length}
        physicsBody={wall.physicsBody}
        opacity={wall.opacity}
      // ref={`box${i}`}
      />
    );
  })
};

export default Walls;
