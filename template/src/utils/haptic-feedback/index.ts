import HapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function triggerSelection() {
  HapticFeedback.trigger('selection', hapticOptions);
}

function triggerImpact() {
  HapticFeedback.trigger('impactLight', hapticOptions);
}

export const HapticFeedbackService = {
  triggerImpact,
  triggerSelection,
};
