import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

/**
 * Runs `callback` every time the app comes to the foreground.
 *
 * The hook every app ends up needing: anything checked at launch and then able
 * to change while the app was away — a permission, an entitlement, data another
 * process wrote — has to be re-checked here, because the OS sends no event for
 * a change made outside the app.
 *
 * The callback is held in a ref, so a caller can pass an inline closure without
 * resubscribing on every render.
 */
export function useOnForeground(callback: () => void): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        callbackRef.current();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

/**
 * Both edges of the foreground transition — for work that has to be stopped as
 * well as started: a timer, a poll, a camera session.
 */
export function useAppStateChange(handlers: {
  onActive?: () => void;
  onBackground?: () => void;
}): void {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        handlersRef.current.onActive?.();

        return;
      }

      // `inactive` is iOS mid-transition — a call banner, the app switcher.
      // Treated as leaving, because work that must not run in the background
      // must not run there either.
      handlersRef.current.onBackground?.();
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
