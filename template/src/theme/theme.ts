/**
 * The app's two themes.
 *
 * Replace the palettes; keep the token names. Every component in `theme/ui`
 * reads colors by role (`surface`, `text2`, `hairline`) rather than by hue, so
 * a new palette is one edit here and nothing else.
 *
 * Shared scales — spacing, radii, type, motion — live in `scales.ts` because
 * both themes reuse them unchanged.
 */
import {
  borderWidth,
  durations,
  gutter,
  motion,
  radii,
  shadow,
  size,
  typography,
  zIndex,
} from './scales';

/** Roles that mean the same thing in both themes. */
const sharedColors = {
  danger: '#A0522E',
  info: '#5C748C',
  success: '#6E8A52',
  warning: '#B08D57',
} as const;

const scales = {
  borderWidth,
  durations,
  gutter,
  motion,
  radii,
  shadow,
  size,
  typography,
  zIndex,
} as const;

export const lightTheme = {
  name: 'light',
  /**
   * Stated rather than derived, so a component can branch on it without
   * asking the OS. `StatusBar` and any surface that has to pick a contrasting
   * treatment read this.
   */
  isDark: false,
  colors: {
    /** The ground behind everything. */
    page: '#EFEBE3',
    /** A panel sitting on the page. */
    surface: '#FBF9F4',
    /** A panel that recedes: a track, a well, an inactive segment. */
    surfaceMuted: '#E4DED2',
    /** A card raised off a surface. */
    card: '#FFFFFF',
    /** Scrim behind a modal or sheet. */
    overlay: 'rgba(28, 26, 23, 0.4)',
    hairline: '#E4DED2',
    hairline2: '#ECE5D8',
    text: '#2C2A26',
    /** Secondary copy: metadata, notes, captions. */
    text2: '#8C8372',
    /** The quietest legible step: placeholders, disabled labels. */
    textMuted: '#B4AA98',
    accent: '#B08D57',
    /** Accent at low opacity: a selected chip, an icon well. */
    accentSoft: '#EDE3D2',
    /** Text and icons drawn on top of `accent`. */
    onAccent: '#FBF9F4',
    /** Text and icons drawn on a dark surface in either theme. */
    onDark: '#FBF9F4',
    primaryButton: '#2C2A26',
    onPrimaryButton: '#FBF9F4',
    background: '#FBF9F4',
    ...sharedColors,
  },
  ...scales,
} as const;

export const darkTheme = {
  name: 'dark',
  isDark: true,
  colors: {
    page: '#1C1A17',
    surface: '#26231E',
    surfaceMuted: '#332E27',
    card: '#2E2A24',
    overlay: 'rgba(0, 0, 0, 0.6)',
    hairline: '#3A352D',
    hairline2: '#423C33',
    text: '#F2EEE6',
    text2: '#B4AA98',
    textMuted: '#7C7365',
    accent: '#C9A876',
    accentSoft: '#3B3327',
    onAccent: '#1C1A17',
    onDark: '#FBF9F4',
    primaryButton: '#F2EEE6',
    onPrimaryButton: '#1C1A17',
    background: '#26231E',
    ...sharedColors,
  },
  ...scales,
} as const;
