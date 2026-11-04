/**
 * Route names two feature modules both need.
 *
 * This module depends on nothing, so a name kept here lets one feature navigate
 * to another's screen without importing it — which is what would otherwise turn
 * a pair of sibling features into an import cycle.
 *
 * A route only one module uses stays in that module's `const.ts`. Move it here
 * when a second module needs to reach it, not before.
 *
 * Names follow `<module>/<Screen>`, which is what `constructRouteName` builds.
 */

/**
 * The app's base route, once first-run is complete. Onboarding resets the stack
 * to it, and the root navigator registers `HomeScreen` under it.
 */
export const HOME_ROUTE = 'home';
