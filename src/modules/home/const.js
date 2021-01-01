import { RouteService } from 'modules/navigation';

export const MODULE_NAME = 'home';

export const ROUTES = {
  HomeScreen: RouteService.constructRouteName(MODULE_NAME, 'HomeScreen'),
};

export const HOME_TABS = {
  Need: {
    title: 'Tražim',
    iconName: 'home-search',
  },
  Offer: {
    title: 'Nudim',
    iconName: 'hand-heart',
  },
};
