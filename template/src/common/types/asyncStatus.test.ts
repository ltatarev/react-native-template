import { ASYNC_STATUS } from './index';

describe('ASYNC_STATUS', () => {
  it('provides stable async state values', () => {
    expect(Object.values(ASYNC_STATUS)).toEqual([
      'idle',
      'loading',
      'success',
      'error',
    ]);
  });
});
