import { useEffect } from 'react';
import NativeSplashScreen from 'react-native-splash-screen';

export function useDismissingSplashScreen() {
  useEffect(() => {
    NativeSplashScreen.hide();
  }, []);
}
