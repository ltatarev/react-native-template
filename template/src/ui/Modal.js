import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';
import PropTypes from 'prop-types';
import { useTheme } from 'theme';
import { PlatformServices } from 'utils/services';
import { Text } from './Text';

export function Modal({
  visible,
  title,
  titleStyle,
  description,
  children,
  onModalClose,
  containerStyle,
  center,
  ...otherProps
}) {
  const theme = useTheme();

  const resolvedContainerStyle = [
    styles.container,
    { backgroundColor: theme['background-color-1'] },
    containerStyle,
  ];

  const resolvedTitleStyle = [styles.title, titleStyle];

  return (
    <RNModal
      propagateSwipe
      isVisible={visible}
      style={styles.modal}
      swipeDirection={['down']}
      onBackdropPress={onModalClose}
      onSwipeComplete={onModalClose}
      {...otherProps}
    >
      <View style={resolvedContainerStyle}>
        <View
          style={[
            styles.topHandle,
            { backgroundColor: theme['background-color-1'] },
          ]}
        />
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
    paddingBottom: 20,
    ...PlatformServices.ifIPhoneX({ paddingBottom: 34 }),
  },
  modal: { margin: 0, justifyContent: 'flex-end' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'relative',
    top: -10,
  },
  topHandle: {
    alignSelf: 'center',
    borderRadius: 6,
    width: 50,
    height: 5,
    position: 'absolute',
    top: -10,
  },
});

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  center: PropTypes.bool,
  containerStyle: PropTypes.object,
  description: PropTypes.string,
  showTopHandle: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
};

Modal.defaultProps = {
  title: '',
  description: '',
  titleStyle: undefined,
  showTopHandle: true,
  containerStyle: null,
  center: false,
};
