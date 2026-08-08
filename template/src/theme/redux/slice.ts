import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { MODULE_NAME } from './const';

/** `system` follows the OS; the other two pin the app to one theme. */
export type AppearanceMode = 'system' | 'light' | 'dark';

export type ThemeState = {
  appearanceMode: AppearanceMode;
};

const initialState: ThemeState = {
  appearanceMode: 'system',
};

/**
 * The chosen appearance, persisted with the rest of the store. `useAppearanceSync`
 * is what turns this into Unistyles state; nothing else should call
 * `UnistylesRuntime.setTheme`.
 */
const themeSlice = createSlice({
  initialState,
  name: MODULE_NAME,
  reducers: {
    setAppearanceMode(state, action: PayloadAction<AppearanceMode>) {
      state.appearanceMode = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
