import { Api, ErrorService } from '../services';
import { coreSlice } from './slices';

export const CoreActions = coreSlice.actions;

export const callApi = (action) => async (dispatch) => {
  dispatch(CoreActions.setLoading(true));

  const response = await Api(action.payload);
  const { ok, problem, data, originalError } = response;

  // ✅ HANDLE SUCCESS
  if (ok) {
    dispatch(CoreActions.setSuccess());
    return data;
  }

  if (problem) {
    // 🧧 HANDLE ERROR
    dispatch(CoreActions.setError(originalError));
    ErrorService.showErrorAlert();
    return null;
  }

  // ❔ HANDLE UNKNOWN ACTION
  dispatch(CoreActions.setLoading(false));
  return null;
};
