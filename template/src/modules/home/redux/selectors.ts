import { MODULE_NAME } from '../const';
import type { HomeState } from './slice';

type HomeRootState = {
  [MODULE_NAME]: HomeState;
};

export function selectHomeInteractionCount(state: HomeRootState) {
  return state[MODULE_NAME].interactionCount;
}
