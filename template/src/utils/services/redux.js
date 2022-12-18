export function createAction(moduleName, actionName) {
  const actionType = `@@${moduleName}/${actionName}`;

  const actionCreator = (payload) => ({
    type: actionType,
    payload,
  });

  return [actionType, actionCreator];
}
