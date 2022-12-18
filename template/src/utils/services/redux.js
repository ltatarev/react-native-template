export function createActionType(moduleName, actionType) {
  return `@@${moduleName}/${actionType}`;
}

export function createAction(actionType) {
  return (payload) => ({
    type: actionType,
    payload,
  });
}
