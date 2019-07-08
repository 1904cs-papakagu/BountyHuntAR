import React from 'react';
import { ViroBox, Viro3DObject } from 'react-viro';

const Agents = props => {
  return Object.values(props.agents).map((agent, index) => {
    console.log('AGENT POSITION:', [agent[0] + props.displacement[0], 0, agent[2] + props.displacement[1]]);
    return (
      <ViroBox
        key={index}
        height={2}
        width={0.5}
        length={0.5}
        position={[
          agent[0] + props.displacement[0],
          0, // agent[1],
          agent[2] + props.displacement[1]
        ]}
        materials={['target']}
      />
    );
  })
};

export default Agents;
