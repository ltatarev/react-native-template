import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

export function useSplashScreen() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);
}
