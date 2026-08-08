import { createNavigationContainerRef } from '@react-navigation/native';

/**
 * Shared ref to the root `NavigationContainer`, attached by `modules/main`'s
 * `App`.
 *
 * Lets code outside the navigator tree navigate or read the focused route — a
 * notification handler, a deep link, a global overlay rendered beside the root
 * stack. Nothing that is inside a screen should use it: `useNavigation` is typed
 * and scoped, this is neither.
 *
 * Untyped by design: this module sits below every feature module, so it cannot
 * reference a specific stack's param list without creating a reverse dependency.
 * Callers narrow route names and params themselves.
 */
export const navigationRef =
  createNavigationContainerRef<Record<string, object | undefined>>();

/** Navigates only once the container is attached; a no-op before that. */
export function navigateWhenReady(name: string, params?: object): void {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.navigate(name, params);
}
