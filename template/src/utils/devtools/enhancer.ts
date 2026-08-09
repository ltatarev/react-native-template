import type { StoreEnhancer } from '@reduxjs/toolkit';
import { rozeniteDevToolsEnhancer } from '@rozenite/redux-devtools-plugin';

/**
 * Applied at store construction rather than mounted like the other panels: an
 * enhancer has to be in place before the first action, and the store is built
 * long before anything renders.
 *
 * In a release bundle the plugin swaps itself for an enhancer that only calls
 * through, so this stays on the store's enhancer list at no cost and there is
 * no `__DEV__` fork here to get wrong.
 */
export const devToolsEnhancer: StoreEnhancer = rozeniteDevToolsEnhancer({
  name: 'Moonquake',
});
