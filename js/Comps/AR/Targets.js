import React from 'react';
import { Viro3DObject } from 'react-viro';

const guardPositions = [
  {
    position: [2.0, 2.0],
    rotationAngle: Math.floor(Math.random() * 360)
  },
  {
    position: [-1.8, -0.2],
    rotationAngle: Math.floor(Math.random() * 360)
  },
  {
    position: [0.2, -1.8],
    rotationAngle: Math.floor(Math.random() * 360)
  },
];

const civPositions = [
  {
    position: [-2.4, -4.2],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  },
  {
    position: [5.2, -3.6],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  },
  {
    position: [-3.1, 2.1],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  },
  {
    position: [4.2, 2.7],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  },
  {
    position: [1.2, 4.3],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  },
  {
    position: [0.0, 5.0],
    rotationAngle: Math.floor(Math.random() * 360),
    face: Math.floor(Math.random() * 3),
  }
];

const randomTarget = [
  {
    source: require('./res/GTP_BMan_Jack/GTP_BMan_Jack_07_Stg_Lsn_Adl_Ccs_Gry_Mgr.obj'),
    type: 'OBJ',
    scale: [0.006, 0.006, 0.006],
    y: -0.75,
    rotationPivot: [-0.5, 1, -0.5],
  },
  {
    source: require('./res/ladylonghair/ladylonghair.obj'),
    type: 'OBJ',
    scale: [0.007, 0.007, 0.007],
    y: -0.2,
    rotationPivot: [-0.5, 1, -0.5],
  },
][Math.floor(Math.random() * 2)];

const Targets = props => {
  const [x, z] = props.displacement;

  return [
    <Viro3DObject
      key={0}
      source={randomTarget.source}
      type={randomTarget.type}
      resources={[]}
      materials={['red']}
      position={[-x, randomTarget.y, z]} // negating x to make Viro and GPS signal agree on coordinates
      scale={randomTarget.scale}
      rotationPivot={randomTarget.rotationPivot}
      onLoadEnd={() => props.setLoading(false)}
      physicsBody={{
        type: 'Dynamic',
        mass: 1,
        shape: { type: 'Box', params: [0.5, 2, 0.5] },
        useGravity: false
      }}
      onCollision={props.hitTarget}
      animation={{
        name: 'patrolT',
        run: true,
        loop: true
      }}
      viroTag="target"
    />,
    ...guardPositions.map((guard, i) => (
      <Viro3DObject
        key={i + 1}
        source={require('./res/old_asian_man/old_asian_man.obj')}
        type="OBJ"
        resources={[]}
        materials={['blue']}
        scale={[0.0011, 0.0011, 0.0011]}
        position={[guard.position[0] - x, -0.9, guard.position[1] + z]}
        rotation={[0, guard.rotationAngle, 0]}
        rotationPivot={[-0.5, 1, -0.5]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: { type: 'Box', params: [1, 2, 1] },
          useGravity: false
        }}
        onCollision={props.hitGuard}
        animation={{
          name: 'patrolG',
          run: true,
          loop: true
        }}
      />
    )),
    ...civPositions.map((civ, i) => (
      <Viro3DObject
        key={i + 4}
        source={require('./res/cilveks2/cilveks2.obj')}
        type="OBJ"
        resources={[]}
        materials={['white']}
        scale={[0.0075, 0.0075, 0.0075]}

        position={[civ.position[0] - x, -2.2, civ.position[1] + z]}
        rotation={[0, civ.rotationAngle, 0]}
        rotationPivot={[-0.5, 1, -0.5]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: { type: 'Box', params: [1, 2, 1] },
          useGravity: false
        }}
        animation={{
          name: `wander${Math.ceil(Math.random() * 3)}`,
          run: true,
          loop: true
        }}
        onCollision={props.hitCiv}
      />
    ))
  ];
};

export default Targets;
