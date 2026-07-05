import React from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { useTheme } from 'theme';

const INDICATOR_CONFIG = {
  small: {
    size: 18,
    trackWidth: 2,
  },
  medium: {
    size: 24,
    trackWidth: 2,
  },
  large: {
    size: 48,
    trackWidth: 4,
  },
} as const;

type IndicatorType = keyof typeof INDICATOR_CONFIG;

type ActivityIndicatorProps = {
  style?: ViewStyle;
  type?: IndicatorType;
} & React.ComponentProps<typeof MaterialIndicator>;

export function ActivityIndicator({
  type = 'medium',
  style,
  ...otherProps
}: ActivityIndicatorProps) {
  const safeType: IndicatorType = Object.keys(INDICATOR_CONFIG).includes(type) && type;
  const config = INDICATOR_CONFIG[safeType];
  const theme = useTheme();

  return (
    <View style={style}>
      <MaterialIndicator
        color={theme['color-info-500']}
        {...config}
        {...otherProps}
      />
    </View>
  );
}
