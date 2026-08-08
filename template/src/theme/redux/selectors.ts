import { MODULE_NAME } from './const';
import type { AppearanceMode, ThemeState } from './slice';

type ThemeRootState = {
  [MODULE_NAME]: ThemeState;
};

export function selectAppearanceMode(state: ThemeRootState): AppearanceMode {
  return state[MODULE_NAME].appearanceMode;
}
