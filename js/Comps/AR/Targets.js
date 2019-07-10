import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const guardPositions = [
  {
    position: [-1.0, 1.0],
    rotationAngle: Math.floor(Math.random() * 360)
  },
  {
    position: [0.9, -0.1],
    rotationAngle: Math.floor(Math.random() * 360)
  }
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
    scale: [0.0075, 0.0075, 0.0075],
    rotationPivot: [-0.5, 1, -0.5],
  },
  {
    source: require('./res/woman_in_suit/woman_in_suit.obj'),
    type: 'OBJ',
    scale: [0.00075, 0.00075, 0.00075],
    rotationPivot: [-0.5, 1, -0.5],
  },
][1]//[Math.floor(Math.random() * 2)];

const Targets = props => {
  const [x, z] = props.displacement;

  return [
    <Viro3DObject
      key={0}
      source={randomTarget.source}
      type={randomTarget.type}
      position={[-x, 0, z]} // negating x to make Viro and GPS signal agree on coordinates
      scale={randomTarget.scale}
      rotationPivot={randomTarget.rotationPivot}
      onLoadEnd={() => props.setLoading(false)}
      physicsBody={{
        type: 'Dynamic',
        mass: 1,
        shape: { type: 'Box', params: [0.5, 2, 0.5] },
        useGravity: true
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
        source={require('./res/bodyguard/MyCharacter.vrx')}
        type="VRX"
        scale={[0.009, 0.009, 0.009]}
        position={[guard.position[0] - x, 0, guard.position[1] + z]}
        rotation={[0, guard.rotationAngle, 0]}
        rotationPivot={[-0.5, 1, -0.5]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: { type: 'Box', params: [1, 2, 1] },
          useGravity: true
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
        key={i + 3}
        source={require('./res/Finn/Finn.obj')}
        type="OBJ"
        materials={[['finnBenRodriguez'], ['finnDavidPatlut'], ['finnDavidYang']][civ.face]}
        scale={[0.02, 0.02, 0.02]}
        position={[civ.position[0] - x, 0, civ.position[1] + z]}
        rotation={[0, civ.rotationAngle, 0]}
        rotationPivot={[-0.5, 1, -0.5]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: { type: 'Box', params: [1, 2, 1] },
          useGravity: true
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
