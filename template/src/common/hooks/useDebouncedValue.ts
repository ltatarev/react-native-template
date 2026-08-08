import { useEffect, useState } from 'react';

/**
 * Lags `value` by `delayMs` — it only updates once changes pause.
 *
 * For anything that reacts to typing: a search field firing a query, a filter
 * recomputing a list, a draft being written to disk.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, value]);

  return debounced;
}
