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
  hide: jest.fn().mockResolvedValue(undefined),
  isVisible: jest.fn(),
  useHideAnimation: jest.fn().mockReturnValue({
    brand: { source: 0 },
    container: {},
    logo: { source: 0 },
  }),
}));

jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn(() => false),
}));
