import { RouteService } from 'modules/navigation';

export const MODULE_NAME = 'onboarding';

export const ROUTES = {
  OnboardingScreen: RouteService.constructRouteName(
    MODULE_NAME,
    'OnboardingScreen',
  ),
};
