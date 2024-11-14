import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { 
  GET_PROFILE_FAIL, 
  GET_PROFILE_REQUEST, 
  GET_PROFILE_SUCCESS,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL, 
} from "../constants/profileConstants";

import { EditProfileData, EditProfileResponse, ProfileResponse } from "../types/profileTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export const getProfile = (profileId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data }: { data: ProfileResponse } = await axios.get(
      `${apiUrl}users/${profileId}`, 
      config
    );

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data.data, 
    });
  } catch (error: any) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response?.data?.message || error.response?.data?.non_field_errors || error.message,
    });
  }
};


export const editProfile =
  (userId: string, profileData: EditProfileData) => async (dispatch: Dispatch) => {
    const tokenString = sessionStorage.getItem("authToken");
    const useToken = tokenString ? JSON.parse(tokenString) : null;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useToken?.token}`,
      },
    };

    try {
      dispatch({ type: EDIT_PROFILE_REQUEST});

      const { data } = await axios.put(
        `${apiUrl}/users/${userId}`,
        profileData,
        config
      );

      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: data, 
      });
    } catch (error: any) {
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
