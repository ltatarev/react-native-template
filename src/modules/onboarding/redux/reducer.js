import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  phoneNumber: null,
  verificationCode: null,
};

export const onboardingReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setUserInfo, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
