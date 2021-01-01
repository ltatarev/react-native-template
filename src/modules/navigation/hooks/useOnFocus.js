import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export function useOnFocus(callback) {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      callback();
    }
  }, [isFocused]);
}
