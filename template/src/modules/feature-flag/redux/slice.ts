import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { FeatureFlag } from '../const';
import { FEATURE_FLAGS, MODULE_NAME } from '../const';

export type FeatureFlagState = Record<FeatureFlag, boolean>;

const initialState: FeatureFlagState = {
  [FEATURE_FLAGS.SAMPLE_FEATURE]: false,
};

const featureFlagSlice = createSlice({
  initialState,
  name: MODULE_NAME,
  reducers: {
    setFeatureFlag(
      state,
      action: PayloadAction<{ flag: FeatureFlag; enabled: boolean }>,
    ) {
      state[action.payload.flag] = action.payload.enabled;
    },
  },
});

export const featureFlagActions = featureFlagSlice.actions;
export const featureFlagReducer = featureFlagSlice.reducer;
