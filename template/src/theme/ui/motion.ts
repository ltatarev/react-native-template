import { useEffect, useState } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import {
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { durations, motion } from '../scales';

export { useReducedMotion };

/**
 * Presence driver for a surface that has to animate out before it unmounts —
 * a sheet, a dialog, an overlay.
 *
 * `progress` runs 0→1 on a spring when shown and 1→0 on a short timing when
 * hidden; `mounted` stays true until the exit finishes, so the caller can keep
 * rendering through it. Under Reduce Motion both ends resolve immediately: the
 * surface still appears and disappears, it just does not travel.
 */
export function useModalPresence(visible: boolean): {
  mounted: boolean;
  progress: SharedValue<number>;
} {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(visible);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.value = reducedMotion
        ? withTiming(1, { duration: 0 })
        : withSpring(1, motion.springs.panel);

      return;
    }

    if (mounted) {
      progress.value = withTiming(
        0,
        { duration: reducedMotion ? 0 : durations.base },
        finished => {
          'worklet';

          if (finished) {
            scheduleOnRN(setMounted, false);
          }
        },
      );
    }
  }, [mounted, progress, reducedMotion, visible]);

  return { mounted, progress };
}

/**
 * Press-scale for a pressable surface, honoring Reduce Motion.
 *
 * Returns the animated style plus the two handlers to spread onto a
 * `Touchable`. Every pressable in `theme/ui` uses this, so the whole app
 * flinches by the same amount on the same spring.
 */
export function usePressScale(scaleTo: number = motion.pressScale.button): {
  onPressIn: () => void;
  onPressOut: () => void;
  scale: SharedValue<number>;
} {
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);

  function onPressIn() {
    if (!reducedMotion) {
      scale.value = withSpring(scaleTo, motion.springs.press);
    }
  }

  function onPressOut() {
    scale.value = withSpring(1, motion.springs.press);
  }

  return { onPressIn, onPressOut, scale };
}
