import { useEffect, useState } from 'react';

/**
 * `true` once `active` has held for `delayMs`, and `false` the instant it drops.
 *
 * A busy indicator on something that usually finishes in a few milliseconds
 * reads as a fault rather than as progress: the control flickers and the tap
 * feels rejected. Deferring it means the fast path never shows one, and only
 * work slow enough to notice gets to explain itself.
 */
export function useDelayedFlag(active: boolean, delayMs: number): boolean {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setTimeout(() => setElapsed(true), delayMs);

    return () => {
      clearTimeout(timer);
      setElapsed(false);
    };
  }, [active, delayMs]);

  // `active` gates the result so the flag drops with it, not a render later.
  return active && elapsed;
}
