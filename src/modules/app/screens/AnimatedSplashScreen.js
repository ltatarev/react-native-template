import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { images } from 'shared/assets';
import { colors } from 'shared/theme';

export function AnimatedSplashScreen({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      backgroundColor={colors.splashScreenBackground}
      logoImage={images.logo}
      logoHeight={150}
      logoWidth={150}
    >
      {children}
    </AnimatedSplash>
  );
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
};
