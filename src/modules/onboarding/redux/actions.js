import { ReduxService } from 'modules/core';
import { MODULE_NAME } from '../const';

export const setUserInfo = ReduxService.actionFactory(
  MODULE_NAME,
  'setUserInfo',
);
