import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { colors } from 'shared/theme';

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

export function ActivityIndicator(props) {
  const { type, style, ...otherProps } = props;
  const config = _.get(INDICATOR_CONFIG, type);

  return (
    <View style={style}>
      <MaterialIndicator
        color={colors.activityIndicator}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...config}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    </View>
  );
}

ActivityIndicator.propTypes = {
  type: PropTypes.string,
  style: ViewPropTypes.style,
};

ActivityIndicator.defaultProps = {
  type: 'medium',
  style: undefined,
};
