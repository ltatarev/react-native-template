import { useEffect } from 'react';

type UseOnMountCallback = (isMounted: () => boolean) => void | Promise<void>;

export function useOnMount(callback: UseOnMountCallback): void {
  useEffect(() => {
    let mounted = true;
    const isMounted = () => mounted;

    Promise.resolve(callback(isMounted)).catch(() => undefined);

    return () => {
      mounted = false;
    };
    // Mount-only: callback is intentionally omitted from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
