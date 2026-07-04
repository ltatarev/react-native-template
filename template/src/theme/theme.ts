import {
  DARK_PALETTE,
  DARK_THEME as LEGACY_DARK_THEME,
  LIGHT_PALETTE,
  LIGHT_THEME as LEGACY_LIGHT_THEME,
} from './colors';

const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
    extraBold: 'Poppins-ExtraBold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 36,
  },
} as const;

const gutter = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
} as const;

const zIndex = {
  base: 0,
  overlay: 10,
  modal: 100,
  toast: 1000,
} as const;

const createShadow = (color: string) => ({
  sm: {
    elevation: 2,
    shadowColor: color,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  md: {
    elevation: 6,
    shadowColor: color,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
});

const createTheme = ({
  background,
  border,
  isDark,
  legacyTheme,
  palette,
  surface,
  text,
}: {
  background: string;
  border: string;
  isDark: boolean;
  legacyTheme: typeof LEGACY_LIGHT_THEME | typeof LEGACY_DARK_THEME;
  palette: typeof LIGHT_PALETTE | typeof DARK_PALETTE;
  surface: string;
  text: string;
}) => ({
  ...palette,
  ...legacyTheme,
  isDark,
  colors: {
    background,
    border,
    danger: palette['color-danger-500'],
    info: palette['color-info-500'],
    primary: palette['color-primary-500'],
    success: palette['color-success-500'],
    surface,
    text,
    textMuted: palette['color-basic-600'],
    warning: palette['color-warning-500'],
  },
  typography,
  gutter,
  radii,
  shadow: createShadow(palette['color-basic-1100']),
  zIndex,
});

export const lightTheme = createTheme({
  background: LIGHT_PALETTE['color-basic-100'],
  border: LIGHT_PALETTE['color-basic-400'],
  isDark: false,
  legacyTheme: LEGACY_LIGHT_THEME,
  palette: LIGHT_PALETTE,
  surface: LIGHT_PALETTE['color-basic-200'],
  text: LIGHT_PALETTE['color-basic-900'],
});

export const darkTheme = createTheme({
  background: DARK_PALETTE['color-basic-900'],
  border: DARK_PALETTE['color-basic-700'],
  isDark: true,
  legacyTheme: LEGACY_DARK_THEME,
  palette: DARK_PALETTE,
  surface: DARK_PALETTE['color-basic-800'],
  text: DARK_PALETTE['color-basic-100'],
});
