import { useDevTools } from 'utils/devtools';
import { storageInstances } from 'utils/storage';

/**
 * Renders nothing, and in a release bundle does nothing at all.
 *
 * Mounted above `PersistGate` rather than beside the other hosts: it should be
 * connected before the store finishes rehydrating, which is exactly the part of
 * launch worth being able to watch.
 */
export function DevToolsHost(): null {
  useDevTools({ storages: storageInstances });

  return null;
}
