export function createAction<Payload = unknown>(
  moduleName: string,
  actionName: string,
) {
  const actionType = `@@${moduleName}/${actionName}`;

  const actionCreator = (payload: Payload) => ({
    type: actionType,
    payload,
  });

  return [actionType, actionCreator] as const;
}
