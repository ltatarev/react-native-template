import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'shared/theme';
import { IconButton } from 'shared/ui';

export function HeaderBackButton() {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  if (canGoBack) {
    return (
      <IconButton
        iconName="arrow-left"
        iconColor={colors.textPrimary}
        iconSize={25}
        iconStyle={styles.icon}
        onPress={navigation.goBack}
      />
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  icon: {
    padding: 20,
    margin: -20,
    marginLeft: 0,
  },
});
