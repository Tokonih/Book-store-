import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { AddReview } from "../reducers/reviewReducers";

const apiUrl = process.env.REACT_APP_API_URL;
const useToken = sessionStorage.getItem("authToken");

console.log(useToken)

export const reviewHandler =
  (reviewData: AddReview) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useToken}`,
          },
      };

      const { data } = await axios.post(
        `${apiUrl}book/add-review`,
        reviewData,
        config
      );


      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: data
      })
    } catch (error: any) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
      });
    }
  };
