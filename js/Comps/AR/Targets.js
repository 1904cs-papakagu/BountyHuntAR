import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const targets = [
  {
    position: [-3, 0, -10],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1
    }
  },
  {
    position: [10, 0, 8],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1
    }
  },
  {
    position: [-13, 0, 0],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1
    }
  },
  {
    position: [-20, 0, -18],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1
    }
  },
  {
    position: [3, 0, 18],
    height: 7,
    width: 2,
    length: 2,
    materials: ['grid'],
    physicsBody: {
      type: 'Dynamic',
      friction: 1,
      mass: 1
    }
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
      mass: 1
    }
  }
];

const Targets = props => {
  // TEST TARGETS
  // return targets.map((target, i) => {
  //   return (
  //     <ViroBox
  //       position={target.position}
  //       height={target.height}
  //       width={target.width}
  //       length={target.length}
  //       materials={target.materials}
  //       physicsBody={{...target.physicsBody, useGravity: false}}
  //       onCollision={props.boxCollide}
  //       // ref={`box${i}`}
  //     />
  //   );
  // })

  // 3D MODELS
  return (
    <Viro3DObject
      source={require('./res/GTP_BMan_Jack/GTP_BMan_Jack_07_Stg_Lsn_Adl_Ccs_Gry_Mgr.obj')}
      position={[-2, -0.5, -1]}
      scale={[0.0075, 0.0075, 0.0075]}
      type="OBJ"
      dragType="FixedDistance"
      physicsBody={{ type: 'Dynamic', mass: 1, useGravity: true }}
      onDrag={() => {}}
    />
  );
};

export default Targets;
