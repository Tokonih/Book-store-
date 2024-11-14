import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, AccountState, ApiResponse } from '../types';

const initialState: AccountState = {
  loading: false,
  error:null
};

export const resetState = (state: typeof initialState) => {
  state.loading = false;
  state.success = false;
  state.error = undefined;
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
      state.success = true;
    },
    accountLoginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetLoginState: resetState, // Shared reset logic
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
      state.success = true;
    },
    accountSignupFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSignupState: resetState,
  },
});


export const {
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
  resetLoginState,
} = accountLoginSlice.actions;

export const {
  accountSignupRequest,
  accountSignupSuccess,
  accountSignupFail,
  resetSignupState,
} = accountSignupSlice.actions;


export const accountLoginReducer = accountLoginSlice.reducer;
export const accountSignupReducer = accountSignupSlice.reducer;
