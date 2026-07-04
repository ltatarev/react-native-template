import { createSlice } from '@reduxjs/toolkit';
import { MODULE_NAME } from '../const';

export type HomeState = {
  interactionCount: number;
};

const initialState: HomeState = {
  interactionCount: 0,
};

const homeSlice = createSlice({
  initialState,
  name: MODULE_NAME,
  reducers: {
    recordInteraction(state) {
      state.interactionCount += 1;
    },
  },
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
