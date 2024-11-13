import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, AccountState, ApiResponse } from '../types';

const initialState: AccountState = {
  loading: false,
};

const accountLoginSlice = createSlice({
  name: 'accountLogin',
  initialState,
  reducers: {
    accountLoginRequest: (state) => {
      state.loading = true;
    },
    accountLoginSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
     
    },
    accountLoginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const accountSignupSlice = createSlice({
  name: 'accountSignup',
  initialState,
  reducers: {
    accountSignupRequest: (state) => {
      state.loading = true;
    },
    accountSignupSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
    },
    accountSignupFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
} = accountLoginSlice.actions;

export const {
  accountSignupRequest,
  accountSignupSuccess,
  accountSignupFail,
} = accountSignupSlice.actions;

export const accountLoginReducer = accountLoginSlice.reducer;
export const accountSignupReducer = accountSignupSlice.reducer;
