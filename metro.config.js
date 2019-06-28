/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    assetExts: [
      'obj',
      'mtl',
      'JPG',
      'vrx',
      'hdr',
      'gltf',
      'glb',
      'bin',
      'arobject',
      'gif',
      'png'
    ]
  }
};
