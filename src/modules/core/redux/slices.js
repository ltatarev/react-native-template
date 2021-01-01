import { createSlice } from '@reduxjs/toolkit';
import { MODULE_NAME } from '../const';

const coreSlice = createSlice({
  name: MODULE_NAME,
  initialState: { loading: false, error: null },
  reducers: {
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
    setSuccess: (state) => ({
      ...state,
      error: null,
      loading: false,
    }),
  },
});

export const coreReducer = coreSlice.reducer;

export const CoreActions = coreSlice.actions;
