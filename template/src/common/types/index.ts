export const ASYNC_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type AsyncStatus = (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
