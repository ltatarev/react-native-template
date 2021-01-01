import React from 'react';
import PropTypes from 'prop-types';
import { Screen, Title } from 'shared/ui';

export function OnboardingScreen({ navigation }) {
  return (
    <Screen>
      <Title title="Onboarding" />
    </Screen>
  );
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
