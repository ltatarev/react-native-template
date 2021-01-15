import { create } from 'apisauce';
import _ from 'lodash';
import Config from 'react-native-config';

const { API_BASE_URL } = Config;

const ApiClient = create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

export const API_ACTIONS = {
  GET: 'get',
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
};

const ApiActions = {
  [API_ACTIONS.GET]: ApiClient.get,
  [API_ACTIONS.DELETE]: ApiClient.delete,
  [API_ACTIONS.POST]: ApiClient.post,
  [API_ACTIONS.PUT]: ApiClient.put,
  [API_ACTIONS.PATCH]: ApiClient.patch,
};

export const prepareBody = (body) => JSON.stringify(body);

export async function Api(actionName, endpoint, params, axiosConfig = {}) {
  if (_.has(ApiActions, actionName)) {
    return ApiActions[actionName](endpoint, params, axiosConfig);
  }

  return null;
}
