import { configureAppThemes } from './services';
import type { AppThemes } from './types';

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

configureAppThemes();
