import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import type { rootReducer } from './store';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, null, UnknownAction>;

export type AppAsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: null;
  rejectValue?: string;
};
