import type { PropsWithChildren, ReactNode } from 'react';
import 'theme/unistyles';
import { useAppearanceSync } from '../hooks';

/**
 * Renders nothing of its own: importing `theme/unistyles` registers the themes,
 * and the hook keeps the active one in step with the persisted choice.
 *
 * Must sit inside the Redux `Provider` (it reads the store) and above anything
 * that styles itself.
 */
export function ThemeProvider({ children }: PropsWithChildren): ReactNode {
  useAppearanceSync();

  return children;
}
