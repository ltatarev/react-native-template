// Add your theme

const typography = {
  fonts: {
    serif: 'SourceSerif4-Regular',
    serifItalic: 'SourceSerif4-It',
    sans: 'Poppins-Regular',
    sansMedium: 'Poppins-Medium',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 22,
    xxl: 28,
  },
  eyebrowLetterSpacing: 0.4,
  promptLineHeight: 1.4,
} as const;

const radii = {
  sm: 8,
  ctrl: 13,
  card: 20,
  frame: 30,
  chip: 999,
} as const;

const gutter = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/** Hairline borders do the work of elevation (§14.4). */
const borderWidth = 0.5 as const;

const shadow = {
  /** The only allowed shadow is a functional one (toast/focus). */
  sm: {
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
} as const;

const zIndex = {
  sheet: 50,
  toast: 100,
} as const;

const sharedColors = {
  /** Coral wax — the one place coral appears in chrome (§14.5). */
  seal: '#D85A30',
  sealInner: '#F0997B',
  danger: '#A0522E',
  info: '#5C748C',
  success: '#6E8A52',
  warning: '#B08D57',
} as const;

export const lightTheme = {
  colors: {
    page: '#EFEBE3',
    surface: '#FBF9F4',
    card: '#FFFFFF',
    hairline: '#E4DED2',
    hairline2: '#ECE5D8',
    text: '#2C2A26',
    text2: '#8C8372',
    textMuted: '#B4AA98',
    accent: '#B08D57',
    onDark: '#FBF9F4',
    primaryButton: '#2C2A26',
    onPrimaryButton: '#FBF9F4',
    socket: '#C9BEA6',
    background: '#FBF9F4',
    ...sharedColors,
  },
  typography,
  radii,
  gutter,
  borderWidth,
  shadow,
  zIndex,
} as const;

export const darkTheme = {
  colors: {
    page: '#1C1A17',
    surface: '#26231E',
    card: '#2E2A24',
    hairline: '#3A352D',
    hairline2: '#423C33',
    text: '#F2EEE6',
    text2: '#B4AA98',
    textMuted: '#7C7365',
    accent: '#C9A876',
    onDark: '#26231E',
    primaryButton: '#F2EEE6',
    onPrimaryButton: '#1C1A17',
    socket: '#5E5745',
    background: '#26231E',
    ...sharedColors,
  },
  typography,
  radii,
  gutter,
  borderWidth,
  shadow,
  zIndex,
} as const;
