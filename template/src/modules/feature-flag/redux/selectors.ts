import type { FeatureFlag } from '../const';
import { FEATURE_FLAGS, MODULE_NAME } from '../const';
import type { FeatureFlagState } from './slice';

type FeatureFlagRootState = {
  [MODULE_NAME]: FeatureFlagState;
};

export function selectFeatureFlags(state: FeatureFlagRootState): FeatureFlagState {
  return state[MODULE_NAME];
}

export function selectFeatureFlag(
  state: FeatureFlagRootState,
  flag: FeatureFlag,
): boolean {
  return state[MODULE_NAME][flag];
}

export function selectSampleFeatureEnabled(state: FeatureFlagRootState): boolean {
  return selectFeatureFlag(state, FEATURE_FLAGS.SAMPLE_FEATURE);
}
