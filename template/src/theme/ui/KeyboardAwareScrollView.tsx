import React, { forwardRef } from 'react';
import type {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
// eslint-disable-next-line max-len
import { KeyboardAwareScrollView as KeyboardControllerScrollView } from 'react-native-keyboard-controller';

/**
 * The scroll container for keyboard-facing forms.
 *
 * Wrapping the library view means features import one primitive (adapter
 * convention) and get the same gap between the focused field and the keyboard
 * everywhere. Behaves like a normal `ScrollView` otherwise.
 *
 * Needs a `KeyboardProvider` above it: the app-root one on pushed screens, or
 * the per-screen one from `<Screen keyboardProvider />` on native-stack
 * `pageSheet`/`formSheet` presentations, whose view hierarchy is out of the
 * root provider's reach.
 */

/** Space kept between the focused field and the top of the keyboard. */
const DEFAULT_BOTTOM_OFFSET = 24;

export type { KeyboardAwareScrollViewProps };

export const KeyboardAwareScrollView = forwardRef<
  KeyboardAwareScrollViewRef,
  KeyboardAwareScrollViewProps
>(function KeyboardAwareScrollView(
  {
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    keyboardShouldPersistTaps = 'handled',
    showsVerticalScrollIndicator = false,
    ...props
  },
  ref,
) {
  return (
    <KeyboardControllerScrollView
      bottomOffset={bottomOffset}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      ref={ref}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    />
  );
});
