module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
  ],
};
