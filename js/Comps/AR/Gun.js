
import React from 'react';

import { ViroImage } from 'react-viro';

export default () => {
  return (
    <ViroImage
      source={require('./res/gun.png')}
      height={0.5}
      width={0.4}
      position={[0.20, -0.40, -1]}
    />
  );
}