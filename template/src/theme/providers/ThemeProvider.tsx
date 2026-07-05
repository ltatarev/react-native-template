import type { PropsWithChildren, ReactNode } from 'react';
import 'theme/unistyles';

export function ThemeProvider({
  children,
}: PropsWithChildren): ReactNode {
  return children;
}
