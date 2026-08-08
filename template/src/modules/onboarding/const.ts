import { RouteService } from 'modules/navigation';

export const MODULE_NAME = 'onboarding';

export const ONBOARDING_ROUTE = RouteService.constructRouteName(
  MODULE_NAME,
  'Welcome',
);
