import React, { ReactNode } from 'react';
import {
  StyleProp, StyleSheet, TextStyle, View, ViewStyle,
} from 'react-native';
import RNModal from 'react-native-modal';
import { useTheme } from 'theme';
import { PlatformServices } from 'utils/services';
import { Text } from './Text';

export type ModalProps = {
  visible: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  children: ReactNode;
  onModalClose: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  showTopHandle?: boolean;
} & RNModal['props'];

export function Modal({
  visible,
  title = '',
  titleStyle = undefined,
  children,
  onModalClose,
  containerStyle = undefined,
  showTopHandle = true,
  ...otherProps
}: ModalProps) {
  const theme = useTheme();

  const resolvedContainerStyle = [
    styles.container,
    { backgroundColor: theme['background-color-1'] },
    containerStyle,
  ];

  const resolvedTitleStyle = [styles.title, titleStyle];

  return (
    <RNModal
      {...otherProps}
      propagateSwipe
      isVisible={visible}
      style={styles.modal}
      swipeDirection={['down']}
      onBackdropPress={onModalClose}
      onSwipeComplete={onModalClose}
    >
      <View style={resolvedContainerStyle}>
        {showTopHandle && (
          <View
            style={[
              styles.topHandle,
              { backgroundColor: theme['background-color-1'] },
            ]}
          />
        )}
        <Text style={resolvedTitleStyle}>{title}</Text>
        {children}
      </View>
    </RNModal>
  );
}

export const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: PlatformServices.isIOSwithNotch() ? 34 : 20,
  },
  modal: { justifyContent: 'flex-end', margin: 0 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'relative',
    top: -10,
  },
  topHandle: {
    alignSelf: 'center',
    borderRadius: 6,
    height: 5,
    position: 'absolute',
    top: -10,
    width: 50,
  },
});
