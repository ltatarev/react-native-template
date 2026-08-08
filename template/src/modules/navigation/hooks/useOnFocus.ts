import { useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';

/**
 * Runs `callback` each time the screen becomes focused — on first mount and on
 * every return to it.
 *
 * The callback is held in a ref, so an inline closure does not re-fire the
 * effect on every render. It runs when focus changes, not when the callback
 * identity does.
 */
export function useOnFocus(callback: () => void): void {
  const isFocused = useIsFocused();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (isFocused) {
      callbackRef.current();
    }
  }, [isFocused]);
}
