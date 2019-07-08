import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const Agents = props => {
  // console.log('AGENT POSITION:', [agent[0] + props.displacement[0], 0, agent[2] + props.displacement[1]]);
  const agent = props.agent;
  const displacement = props.displacement;
  return (
    <ViroBox
      height={2}
      width={0.5}
      length={0.5}
      position={[
        agent[0] + displacement[0],
        0, // agent[1],
        agent[2] + displacement[1]
      ]}
      materials={['target']}
    />
  );
};

export default Agents;
