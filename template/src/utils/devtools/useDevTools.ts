import type { MMKV } from 'react-native-mmkv';
import { useMMKVDevTools } from '@rozenite/mmkv-plugin';
import { useReduxDevToolsAgentTools } from '@rozenite/redux-devtools-plugin';

export type DevToolsTargets = {
  /** Keyed by MMKV instance id. v4 does not expose an id to read back. */
  storages: Record<string, MMKV>;
};

/**
 * Connects the running app to the Rozenite panels, and to the agent tools
 * behind them: with this mounted, Redux state and both MMKV instances can be
 * read from the debugger or from a shell over `rozenite agent`.
 *
 * Every plugin here neutralizes itself in a release bundle, so the hooks are
 * called unconditionally — the rules of hooks are not negotiable and a
 * `__DEV__` fork around them would be the one thing that breaks a release.
 */
export function useDevTools({ storages }: DevToolsTargets): void {
  useMMKVDevTools({ storages });
  useReduxDevToolsAgentTools();
}
