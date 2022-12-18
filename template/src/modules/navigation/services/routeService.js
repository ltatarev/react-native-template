import _ from 'lodash';

export function getRouteParams(props) {
  return _.get(props, 'route.params', null);
}

export const constructRouteName = (moduleName, screen) => `${moduleName}/${screen}`;
