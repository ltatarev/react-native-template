import React from 'react';
import { View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import _ from 'lodash';
import PropTypes from 'prop-types';
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
};

export function ActivityIndicator({ type, style, ...otherProps }) {
  const config = _.get(INDICATOR_CONFIG, type);

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

ActivityIndicator.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
};

ActivityIndicator.defaultProps = {
  style: undefined,
  type: 'medium',
};
