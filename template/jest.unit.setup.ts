/* eslint-disable no-underscore-dangle */
/* global jest */

(globalThis as { __DEV__?: boolean }).__DEV__ = false;

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({
      height: 812,
      width: 375,
    })),
  },
  NativeModules: {},
  Platform: {
    OS: 'ios',
    select: (options: Record<string, unknown>) => options.ios ?? options.default,
  },
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn(() => false),
}));
