import { formatBytes, formatDuration, formatShortDate } from './format';

describe('formatBytes', () => {
  it('keeps one decimal under ten gigabytes and drops it above', () => {
    expect(formatBytes(1.25 * 1024 ** 3)).toBe('1.3 GB');
    expect(formatBytes(12.4 * 1024 ** 3)).toBe('12 GB');
  });

  it('never reports zero for a file that exists', () => {
    expect(formatBytes(1)).toBe('1 KB');
  });

  it('reports nothing as zero rather than as a fraction', () => {
    expect(formatBytes(0)).toBe('0 MB');
    expect(formatBytes(Number.NaN)).toBe('0 MB');
  });
});

describe('formatDuration', () => {
  it('shows hours only when there are any', () => {
    expect(formatDuration(83)).toBe('1:23');
    expect(formatDuration(3753)).toBe('1:02:33');
  });

  it('clamps a negative duration to zero', () => {
    expect(formatDuration(-5)).toBe('0:00');
  });
});

describe('formatShortDate', () => {
  it('omits the year within the current year', () => {
    const now = new Date('2026-08-01T00:00:00.000Z');

    expect(formatShortDate('2026-06-12T00:00:00.000Z', now)).not.toMatch(/2026/);
    expect(formatShortDate('2024-06-12T00:00:00.000Z', now)).toMatch(/2024/);
  });

  it('renders an unusable date as nothing', () => {
    expect(formatShortDate(undefined)).toBe('');
    expect(formatShortDate('not a date')).toBe('');
  });
});
