import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { 
  GET_PROFILE_FAIL, 
  GET_PROFILE_REQUEST, 
  GET_PROFILE_SUCCESS 
} from "../constants/profileConstants";
import { ProfileResponse } from "../types/profileTypes";

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

    console.log(data);

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
