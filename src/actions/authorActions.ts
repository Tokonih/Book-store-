import { Dispatch } from "@reduxjs/toolkit";
import {
  GET_AUTHOR_FAIL,
  GET_AUTHOR_REQUEST,
  GET_AUTHOR_SUCCESS,
} from "../constants/authorConstants";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAuthor = (authorId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_AUTHOR_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${apiUrl}book/author/${authorId}`, config);

    console.log(data)

    dispatch({
      type: GET_AUTHOR_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_AUTHOR_FAIL,
      payload:
        error.response?.data?.non_field_errors || error.response?.data?.message || error.message,
    });
  }
};
