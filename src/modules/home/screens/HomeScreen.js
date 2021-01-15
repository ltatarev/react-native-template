import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  StackNavigatorService,
  useNavigationOptions,
} from 'modules/navigation';
import { colors } from 'shared/theme';
import { Button, Screen, Text } from 'shared/ui';

export function HomeScreen(props) {
  const { navigation } = props;

  useNavigationOptions(StackNavigatorService.hideHeader);

  return (
    <Screen>
      <Text>Home</Text>
    </Screen>
  );
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

const styles = StyleSheet.create({});
