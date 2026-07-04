import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

type RowProps = {
  children: React.ReactNode;
  style?: ViewStyle;
} & ViewProps;

export function Row(props: RowProps) {
  const { children, style = {}, ...otherProps } = props;
  const containerStyle = [style, styles.row];

  return (
    <View style={containerStyle} {...otherProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
