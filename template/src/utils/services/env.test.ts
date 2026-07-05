import { getEnvBool, getEnvInt } from './env';

describe('env utilities', () => {
  describe('getEnvBool', () => {
    it('reads true values case-insensitively', () => {
      expect(getEnvBool('true')).toBe(true);
      expect(getEnvBool('TRUE')).toBe(true);
    });

    it('treats empty and non-true values as false', () => {
      expect(getEnvBool('')).toBe(false);
      expect(getEnvBool('false')).toBe(false);
    });
  });

  describe('getEnvInt', () => {
    it('parses decimal strings', () => {
      expect(getEnvInt('42')).toBe(42);
    });

    it('returns zero for empty values', () => {
      expect(getEnvInt('')).toBe(0);
    });
  });
});
