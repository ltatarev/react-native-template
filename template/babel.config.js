module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
        extensions: ['.js'],
        alias: {
          assets: './src/assets',
          common: './src/common',
          modules: './src/modules',
          ui: './src/ui',
        },
      },
    ],
  ],
};
