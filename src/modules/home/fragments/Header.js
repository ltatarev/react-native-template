import React, { useState } from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { colors } from 'shared/theme';
import { Button, Row } from 'shared/ui';
import { HOME_TABS } from '../const';

export function Header() {
  const [selectedOption, setSelectedOption] = useState(HOME_TABS.Need.title);

  function renderButton({ title, iconName }) {
    const isSelected = selectedOption === title;
    const iconColor = isSelected
      ? colors.buttonTextPrimary
      : colors.buttonPrimary;
    const onPress = () => setSelectedOption(title);

    return (
      <Button
        key={title}
        secondary={!isSelected}
        title={title}
        buttonStyle={styles.button}
        iconName={iconName}
        iconColor={iconColor}
        onPress={onPress}
      />
    );
  }

  return (
    <Row style={styles.container}>
      {_.map(HOME_TABS, (tab) => renderButton(tab))}
    </Row>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

const styles = StyleSheet.create({
  container: { alignContent: 'space-around', marginHorizontal: -20 },
  button: { flex: 1, marginHorizontal: 10 },
});
