module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types'],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    ['@babel/plugin-transform-classes'],
    ['@babel/plugin-proposal-export-namespace-from'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          assets: './src/assets',
          common: './src/common',
          modules: './src/modules',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
    [
      'react-native-unistyles/plugin',
      {
        root: 'src',
      },
    ],
    'react-native-worklets/plugin',
  ],
};
