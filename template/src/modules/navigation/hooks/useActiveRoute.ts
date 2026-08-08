import { useNavigationState } from '@react-navigation/native';

/**
 * The focused route's name, or `undefined` before the navigator has mounted.
 *
 * For chrome that lives beside the navigator rather than inside a screen — a
 * floating action button that changes what it adds, an overlay that hides itself
 * on one route. A screen should never need this: it already knows where it is.
 */
export function useActiveRoute(): string | undefined {
  return useNavigationState(state => state?.routes[state.index]?.name);
}
