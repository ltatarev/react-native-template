import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Icon, Text } from 'shared/ui';
import { PlatformUtils } from 'shared/utils';
import { TabNavigatorService } from '../services';

export function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { label, iconName, color } =
          TabNavigatorService.resolveTabOptions(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        function renderIcon() {
          return <Icon color={color} name={iconName} size={27} />;
        }

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}
            key={_.uniqueId()}
            style={styles.buttonContainer}
          >
            {renderIcon()}
            <Text
              uppercase
              medium
              style={{
                color,
                fontSize: 13,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TabBar.propTypes = {
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EFEFF8',
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    ...PlatformUtils.ifIPhoneX({ marginBottom: 35 }),
  },
  center: {
    alignSelf: 'center',
  },
});
