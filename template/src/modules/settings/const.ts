import { RouteService } from 'modules/navigation';

export const MODULE_NAME = 'settings';

export const SETTINGS_ROUTE = RouteService.constructRouteName(
  MODULE_NAME,
  'Settings',
);
