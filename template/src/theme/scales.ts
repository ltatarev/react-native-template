/**
 * Shared scales — the tokens both themes reuse unchanged.
 *
 * This file imports nothing on purpose: tokens are plain data so they stay
 * safe across the Unistyles native boundary and inside node unit tests.
 * Anything that needs a runtime (easings, platform branches) is built at the
 * edge that consumes it, not here.
 */

export const gutter = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radii = {
  none: 0,
  sm: 8,
  /** Inline controls: fields, small buttons, segments. */
  ctrl: 13,
  card: 20,
  /** Top corners of a bottom sheet, full-screen frames. */
  frame: 30,
  /** Pills and chips. */
  chip: 999,
} as const;

export const typography = {
  fonts: {
    serif: 'SourceSerif4-Regular',
    serifItalic: 'SourceSerif4-It',
    sans: 'Poppins-Regular',
    sansMedium: 'Poppins-Medium',
  },
  fontSize: {
    /** Eyebrow labels, the quietest step. */
    xs: 11,
    /** Metadata rows, chips, captions. */
    sm: 13,
    /** Card titles and body copy. */
    md: 15,
    lg: 17,
    /** Section titles. */
    xl: 22,
    /** Screen titles. */
    xxl: 28,
  },
  /** Paired 1:1 with `fontSize` — `Text` reads both by the same key. */
  lineHeight: {
    xs: 15,
    sm: 18,
    md: 21,
    lg: 24,
    xl: 28,
    xxl: 34,
  },
  eyebrowLetterSpacing: 0.4,
  promptLineHeight: 1.4,
  /** Tabular figures — required on anything that counts or measures. */
  numeric: { tabular: 'tabular-nums' },
} as const;

/** Hairline borders do the work of elevation. */
export const borderWidth = 0.5 as const;

export const shadow = {
  /** The only allowed shadow is a functional one (toast/focus). */
  sm: {
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
} as const;

export const zIndex = {
  base: 0,
  overlay: 10,
  sheet: 50,
  toast: 100,
  modal: 200,
} as const;

export const durations = {
  /** Tap feedback — quicker than the chrome around it. */
  fast: 120,
  base: 200,
  slow: 320,
} as const;

/**
 * Motion presets. Springs settle fast with at most one soft overshoot, never a
 * visible wobble; everything runs on the UI thread through Reanimated.
 *
 * Feature code reads these through `theme.motion` rather than writing spring
 * configs inline, so a change to how the app moves is one edit.
 */
export const motion = {
  springs: {
    /** Sheets and panels arriving — gentle, one soft overshoot at most. */
    panel: { damping: 26, mass: 1, stiffness: 260 },
    /** Press feedback and selection pops — settles quickly, no bounce. */
    press: { damping: 24, mass: 0.9, stiffness: 320 },
    /** Value changes (progress fills) — smooth, never past the value. */
    value: { damping: 30, mass: 1, overshootClamping: true, stiffness: 220 },
  },
  /** Scale applied to a pressable surface while it is held. */
  pressScale: {
    button: 0.97,
    /** A full-bleed surface: 0.97 reads as a tap on a button, a flinch here. */
    card: 0.985,
    icon: 0.92,
  },
  /** How long a toast holds before it dismisses itself. */
  toastHold: 3000,
  /** A toast with an action lingers, so the action can be reached. */
  toastHoldWithAction: 6000,
  skeletonDuration: 900,
} as const;

/**
 * Fixed sizes that both styles and layout math need. A component that reserves
 * room for another one reads the number from here rather than copying it.
 */
export const size = {
  /** Height of an inline control: a field, a round icon button, a large button. */
  control: 48,
  /** A pill button, a segment. */
  controlSm: 38,
  /** A control drawn inside a row: a small pill, a toggle box. */
  controlXs: 32,
  /** The minimum square a touch target may be (Apple HIG / Material). */
  touchTarget: 44,
  icon: {
    sm: 14,
    md: 18,
    lg: 22,
    /** A glyph standing in for a whole screenful of nothing. */
    figure: 48,
  },
  /** Thin progress track. */
  progressBar: 6,
  /** The pill at the top of a sheet that says it can be dragged away. */
  grabber: { height: 4, width: 38 },
} as const;
