import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

export function useSplashScreen(...dependencies) {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, [dependencies]);
}
