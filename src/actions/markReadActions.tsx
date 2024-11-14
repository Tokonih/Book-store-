import axios from "axios";
import {
  MARK_READ_REQUEST,
  MARK_READ_SUCCESS,
  MARK_READ_FAIL,
} from "../constants/markRead";
import { Dispatch } from "@reduxjs/toolkit";
import { MarkReadData } from "../types";

const apiUrl = process.env.REACT_APP_API_URL;
const useToken = JSON.parse(sessionStorage.getItem("authToken") || "{}");

export const markAsRead = (bookId:any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: MARK_READ_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useToken.token}`,
      },
    };

    const { data } = await axios.post(
      `${apiUrl}users/add-read-book`,
      bookId,
      config
    );

    dispatch({
      type: MARK_READ_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: MARK_READ_FAIL,
    });
  }
};
