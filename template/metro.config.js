const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withRozenite } = require('@rozenite/metro');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: { assetExts, sourceExts },
} = defaultConfig;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Rozenite is off unless the dev server is started with WITH_ROZENITE=true
// (`yarn start:debug`). An agent session takes over the debugger connection,
// so a normal `yarn start` keeps React Native DevTools to itself.
module.exports = withRozenite(mergeConfig(defaultConfig, config), {
  enabled: process.env.WITH_ROZENITE === 'true',
});
