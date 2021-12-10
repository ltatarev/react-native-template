import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import RNModal from 'react-native-modal';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';
import { PlatformUtils } from 'shared/utils';
import { Text } from './Text';

export function Modal(props) {
  const {
    visible,
    title,
    titleStyle,
    description,
    children,
    handleModalClose,
    containerStyle,
    center,
    ...otherProps
  } = props;

  const resolvedContainerStyle = [styles.container, containerStyle];

  const resolvedTitleStyle = [styles.title, titleStyle];

  return (
    <RNModal
      isVisible={visible}
      style={styles.modal}
      propagateSwipe
      onSwipeComplete={handleModalClose}
      onBackdropPress={handleModalClose}
      swipeDirection={['down']}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      <View style={resolvedContainerStyle}>
        <View style={styles.topHandle} />
        <Text style={resolvedTitleStyle}>{title}</Text>
        {children}
      </View>
    </RNModal>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 20,
    ...PlatformUtils.ifIPhoneX({ paddingBottom: 34 }),
  },
  modal: { margin: 0, justifyContent: 'flex-end' },
  title: { fontSize: 24, fontWeight: 'bold', position: 'relative', top: -10 },
  topHandle: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 6,
    width: 50,
    height: 5,
    position: 'absolute',
    top: -10,
  },
});

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  titleStyle: Text.propTypes.style,
  children: PropTypes.node.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  showTopHandle: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  center: PropTypes.bool,
};

Modal.defaultProps = {
  title: '',
  description: '',
  titleStyle: undefined,
  showTopHandle: true,
  containerStyle: null,
  center: false,
};
