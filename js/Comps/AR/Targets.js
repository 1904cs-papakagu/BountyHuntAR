import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

// DELETE AFTER:
import {ViroText} from 'react-viro';
import {StyleSheet, View} from 'react-native';
// ---

const targets = [
  {
    position: [-3, 0, -10],
  },
  {
    position: [10, 0, 8],
  },
  {
    position: [0, 0, -2],
  },
  {
    position: [-20, 0, -18],
  },
  {
    position: [3, 0, 18],
  },
  {
    position: [-10, 0, -16],
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
  // });

  // 3D MODELS
  // return targets.map((target, i) => (
  //   <Viro3DObject
  //     key={i}
  //     source={require('./res/GTP_BMan_Jack/GTP_BMan_Jack_07_Stg_Lsn_Adl_Ccs_Gry_Mgr.obj')}
  //     position={target.position}
  //     scale={[0.0075, 0.0075, 0.0075]}
  //     type="OBJ"
  //     dragType="FixedDistance"
  //     physicsBody={{
  //       type: 'Dynamic',
  //       mass: 1,
  //       useGravity: true,
  //     }}
  //     scalePivot={[0,0,0]}
  //     rotationPivot={[.2,1,.2]}
  //   />
  // ));

  // ACTUAL TARGETS

  // const [x, z] = props.location;
  const x = Number(props.location[0]);
  const z = Number(props.location[1]);

  console.log('IS X NaN?', Number.isNaN(x));
  console.log('IS NaN NaN?', Number.isNaN(NaN));
  console.log('WHAT IS X?', x);
  console.log('WHAT IS Z?', z);

  return (
    <ViroBox
      position={[x, 0, z]}    // y (altitude) should always be 0
      height={2.0}
      width={0.4}
      length={0.4}
      materials={['grid']}
      physicsBody={{
        type: 'Dynamic',
        mass: 1,
        useGravity: true,
      }}
    />
  );
};

// FOR DEBUGGING:

// <ViroText text={x.toString() + z.toString()} height={1} width={4} position={[0, 0, -2]} style={styles.helloWorldTextStyle}/>
// <ViroBox
//   position={[x, 0, z]}    // y (altitude) should always be 0
//   height={2.0}
//   width={0.4}
//   length={0.4}
//   materials={['grid']}
//   physicsBody={{
//     type: 'Dynamic',
//     mass: 1,
//     useGravity: true,
//   }}
// />

export default Targets;

// DELETE AFTER:
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});