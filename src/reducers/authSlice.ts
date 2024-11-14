import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: { loading: false, success: false, error: undefined },
    signup: { loading: false, success: false, error: undefined },
  },
  reducers: {
    resetAuthState: (state) => {
      state.login = { loading: false, success: false, error: undefined };
      state.signup = { loading: false, success: false, error: undefined };
    },
    accountLoginRequest: (state) => {
      state.login.loading = true;
      state.login.error = undefined;
      state.login.success = false;
    },
    accountLoginSuccess: (state) => {
      state.login.loading = false;
      state.login.success = true;
    },
    accountLoginFail: (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },
    accountSignupRequest: (state) => {
      state.signup.loading = true;
      state.signup.error = undefined;
      state.signup.success = false;
    },
    accountSignupSuccess: (state) => {
      state.signup.loading = false;
      state.signup.success = true;
    },
    accountSignupFail: (state, action) => {
      state.signup.loading = false;
      state.signup.error = action.payload;
    },
  },
});

export const {
  resetAuthState,
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
  accountSignupRequest,
  accountSignupSuccess,
  accountSignupFail,
} = authSlice.actions;

export default authSlice.reducer;
