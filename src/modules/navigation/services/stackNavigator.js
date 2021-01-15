import React from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';

export const hideHeader = { headerShown: false };
export const hideHeaderLeft = { headerLeft: null };

export const defaultScreenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: {
    shadowColor: 'rgba(256,256,256,0)',
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0,
  },
  headerTransparent: true,
  headerTitle: null,
  headerTitleStyle: { alignSelf: 'center', textAlign: 'center' },
};
