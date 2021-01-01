import { createAction } from '@reduxjs/toolkit';

const actionTypeFactory = (moduleName, actionName) =>
  `@@${moduleName}/${actionName}`;

export const actionFactory = (moduleName, actionName) =>
  createAction(actionTypeFactory(moduleName, actionName));
