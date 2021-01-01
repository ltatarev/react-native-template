import _ from 'lodash';
import { colors } from 'shared/theme';
import { TABS } from '../const';

const tabIconsColors = {
  color: colors.textSecondary,
  focused: colors.buttonPrimary,
};

export function resolveTabOptions(tabName, isFocused) {
  if (!_.has(TABS, tabName)) {
    return {};
  }

  const color = isFocused ? tabIconsColors.focused : tabIconsColors.color;

  const label = _.get(TABS[tabName], 'title', '');
  const iconName = _.get(TABS[tabName], 'icon', '');

  return { label, color, iconName };
}
