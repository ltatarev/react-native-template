import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const hideHeader: NativeStackNavigationOptions = { headerShown: false };
export const hideHeaderLeft: NativeStackNavigationOptions = {
  headerBackVisible: false,
};

export const defaultScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTransparent: true,
  title: '',
};
