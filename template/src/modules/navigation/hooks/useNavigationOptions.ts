import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export function useNavigationOptions(options: StackNavigationOptions) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
}
