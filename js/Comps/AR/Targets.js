import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const guardPositions = [
  {
    position: [-1.0, 1.0]
  },
  {
    position: [0.9, -0.1]
  },
];

const civPositions = [
  {
    position: [-2.4, -4.2]
  },
  {
    position: [5.2, -3.6]
  },
  {
    position: [-3.1, 2.1]
  },
  {
    position: [4.2, 2.7]
  },
  {
    position: [1.2, 4.3]
  },
  {
    position: [0.0, 5.0]
  },
];

const Targets = props => {

  const [x, z] = props.displacement;

  return ([

    <Viro3DObject
      key={0}
      source={require('./res/GTP_BMan_Jack/GTP_BMan_Jack_07_Stg_Lsn_Adl_Ccs_Gry_Mgr.obj')}
      type='OBJ'
      position={[-x, 0, z]} // negating x to make Viro and GPS signal agree on coordinates
      scale={[0.0075, 0.0075, 0.0075]}
      physicsBody={{
        type: 'Dynamic',
        mass: 1,
        shape: { type: 'Box', params: [0.5, 2.0, 0.5] },
        useGravity: true
      }}
      onCollision={props.hitTarget}
      viroTag="target"
    />,
    ...guardPositions.map((guard, i) => (
      <Viro3DObject
        key={i + 1}
        source={require('./res/bodyguard/MyCharacter.vrx')}
        type='VRX'
        scale={[0.009, 0.009, 0.009]}
        position={[guard.position[0] - x, 0, guard.position[1] + z]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: {type: 'Box', params: [3, 3, 3]},
          useGravity: true
        }}
        onCollision={props.hitCiv}
      />
    )),
    ...civPositions.map((civ, i) => (
      <Viro3DObject
        key={i + 3}
        source={require('./res/human_man_1.2/human_man_1.2.obj')}
        type='OBJ'
        scale={[0.25, 0.25, 0.25]}
        position={[civ.position[0] - x, 0, civ.position[1] + z]}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          shape: { type: 'Box', params: [3, 3, 3] },
          useGravity: true
        }}
        onCollision={props.hitCiv}
      />
    )),
  ])
};

export default Targets;

