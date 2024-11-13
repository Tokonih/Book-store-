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

const apiUrl = process.env.REACT_APP_API_URL;

// Account Login Action
export const adminLoginHandler =
  (UserLoginData: UserLoginData) => async (dispatch: Dispatch) => {
    try {
      dispatch(accountLoginRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post<ApiResponse>(
        `${apiUrl}users/login/`,
        UserLoginData,
        config
      );
      console.log(data);
      const response: ApiResponse = data; 

      sessionStorage.setItem(
        "authToken",
        JSON.stringify({ token: response.token })
      );

      sessionStorage.setItem(
        "userData",
        JSON.stringify({ token: response})
      );

      // Dispatch success action
      dispatch(accountLoginSuccess(response)); // Dispatch with the correct type
    } catch (error: any) {
      dispatch(
        accountLoginFail(
          error.response?.data?.non_field_errors || error.message
        )
      );
    }
  };

// Account Register Action
export const adminSignupHandler = (userData: UserData) => async (dispatch: Dispatch) => {
    try {
      dispatch(accountSignupRequest());
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Decamelize user data
      const decamelizedData = humps.decamelizeKeys(userData);
      console.log("User data after decamelization:", decamelizedData);
  
      // Make the API request
      const { data } = await axios.post<ApiResponse>(
        `${apiUrl}users/register/`, 
        decamelizedData,
        config
      );
  
      console.log("Response data:", data);
  
      const response = humps.camelizeKeys(data) as ApiResponse;
  
      sessionStorage.setItem("authToken", JSON.stringify({ token: response.token }));
  
      dispatch(accountSignupSuccess(response));
    } catch (error: any) {
      console.error("Error occurred:", error);
      console.error("API error response:", error.response?.data);
  
      const errorMessage = error.response?.data?.non_field_errors || error.message;
      dispatch(accountSignupFail(errorMessage));
    }
  };
  