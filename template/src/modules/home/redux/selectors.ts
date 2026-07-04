import type { RootState } from 'modules/redux';
import { MODULE_NAME } from '../const';

export function selectHomeInteractionCount(state: RootState) {
  return state[MODULE_NAME].interactionCount;
}
