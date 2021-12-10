import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useNavigationOptions(options, dependencies = null) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options, dependencies]);
}
