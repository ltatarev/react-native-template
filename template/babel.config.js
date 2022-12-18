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
          modules: './src/modules',
          theme: './src/theme',
          ui: './src/ui',
          utils: './src/utils',
        },
      },
    ],
  ],
};
