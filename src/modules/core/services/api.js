import { create } from 'apisauce';
import _ from 'lodash';
import Config from 'react-native-config';
import { coreActions } from '../redux';
import { showErrorAlert } from './errorAlert';

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

const Api = {
  [API_ACTIONS.GET]: ApiClient.get,
  [API_ACTIONS.DELETE]: ApiClient.delete,
  [API_ACTIONS.POST]: ApiClient.post,
  [API_ACTIONS.PUT]: ApiClient.put,
  [API_ACTIONS.PATCH]: ApiClient.patch,
};

export const prepareBody = (body) => JSON.stringify(body);

export async function callApi(
  actionName,
  endpoint,
  params,
  dispatch,
  axiosConfig = {},
) {
  dispatch(coreActions.setLoading(true));

  if (_.has(Api, actionName)) {
    const response = await Api[actionName](endpoint, params, axiosConfig);
    const { ok, problem, data, originalError } = response;

    // HANDLE SUCCESS
    if (ok) {
      dispatch(coreActions.setSuccess());
      return data;
    }

    // HANDLE ERROR
    // eslint-disable-next-line no-console
    console.warn('API ERROR', problem, originalError);
    dispatch(coreActions.setError(originalError));
    showErrorAlert();
    return null;
  }

  // HANDLE UNKNOWN ACTION
  dispatch(coreActions.setLoading(false));
  return null;
}
