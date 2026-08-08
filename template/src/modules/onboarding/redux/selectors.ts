import { MODULE_NAME } from '../const';
import type { OnboardingState } from './slice';

type OnboardingRootState = {
  [MODULE_NAME]: OnboardingState;
};

export function selectOnboardingCompleted(state: OnboardingRootState): boolean {
  return state[MODULE_NAME].completed;
}
