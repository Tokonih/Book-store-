import axios from "axios";
import { Dispatch } from "redux";
import {
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
} from "../reducers/accountReducers";
import {
  accountSignupRequest,
  accountSignupSuccess,
  accountSignupFail,
} from "../reducers/accountReducers";
import { UserLoginData, UserData, ApiResponse } from "../types";
import humps from "humps";
import { resetAuthState } from "../reducers/authSlice";

const apiUrl = process.env.REACT_APP_API_URL;

export const resetAuthStateAction = () => (dispatch: Dispatch) => {
  dispatch(resetAuthState());
};


const performAuthRequest = async (
  dispatch: Dispatch,
  requestAction: Function,
  successAction: Function,
  failAction: Function,
  apiEndpoint: string,
  payload: any
) => {
  try {
    dispatch(requestAction());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post<ApiResponse>(apiEndpoint, payload, config);

    sessionStorage.setItem(
      "authToken",
      JSON.stringify({ token: data.token })
    );

    sessionStorage.setItem("userData", JSON.stringify(data));

    dispatch(successAction(data));
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.non_field_errors || error.message;
    dispatch(failAction(errorMessage));
  }
};


export const adminLoginHandler =
  (userLoginData: UserLoginData) => async (dispatch: Dispatch) => {
    const endpoint = `${apiUrl}users/login/`;
    await performAuthRequest(
      dispatch,
      accountLoginRequest,
      accountLoginSuccess,
      accountLoginFail,
      endpoint,
      userLoginData
    );
  };

export const adminSignupHandler =
  (userData: UserData) => async (dispatch: Dispatch) => {
    const endpoint = `${apiUrl}users/register/`;
    const decamelizedData = humps.decamelizeKeys(userData);
    await performAuthRequest(
      dispatch,
      accountSignupRequest,
      accountSignupSuccess,
      accountSignupFail,
      endpoint,
      decamelizedData
    );
  };


