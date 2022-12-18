import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useNavigationOptions(options, ...dependencies) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options, dependencies]);
}
