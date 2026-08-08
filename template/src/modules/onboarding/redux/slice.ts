import { createSlice } from '@reduxjs/toolkit';
import { MODULE_NAME } from '../const';

export type OnboardingState = {
  completed: boolean;
};

const initialState: OnboardingState = {
  completed: false,
};

/**
 * First-run progress: the flow shows until `completed`, then never again.
 *
 * Deliberately tiny. Whatever the flow collects belongs to the feature that
 * owns it — this slice only remembers that it happened, which is the one fact
 * the navigator needs to pick a starting route.
 */
const onboardingSlice = createSlice({
  initialState,
  name: MODULE_NAME,
  reducers: {
    complete(state) {
      state.completed = true;
    },
    /** Escape hatch for development and for a "reset app" action. */
    reset(state) {
      state.completed = false;
    },
  },
});

export const onboardingActions = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
