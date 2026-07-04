module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.unit.config.js' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFiles: ['<rootDir>/jest.unit.setup.ts'],
  watchman: false,
};
