import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiResponse, BookState, CreateBook, singleBookState } from "../types";
import {
  GET_BOOK_FAIL,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_FAIL,
  CREATE_BOOK_SUCCESS,
} from "../constants/bookConstants";

interface BookResponse extends ApiResponse {
  books: BookState;
  singleBook: singleBookState;
  createBook: CreateBook;
}

const apiUrl = process.env.REACT_APP_API_URL;
// const useToken = sessionStorage.getItem("authToken");
const useToken = JSON.parse(sessionStorage.getItem("authToken") || "{}");

export const createBook = (createBook: {}) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useToken.token}`,
    },
  };
  try {
    dispatch({ type: CREATE_BOOK_REQUEST });

    const { data } = await axios.post<BookResponse>(
      `${apiUrl}book/create`,
      createBook,
      config
    );

    dispatch({
      type: CREATE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: CREATE_BOOK_FAIL,
      payload: "Failed to create",
    });
  }
};

export const getAllBooks = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_BOOK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get<BookResponse>(`${apiUrl}book/`, config);

    dispatch({
      type: GET_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_BOOK_FAIL,
      payload: error.response?.data?.non_field_errors || error.message,
    });
  }
};

export const getSingleBook = (bookId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_BOOK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get<BookResponse>(
      `${apiUrl}book/${bookId}`,
      config
    );

    dispatch({
      type: GET_SINGLE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_SINGLE_BOOK_FAIL,
      payload: error.response?.data?.non_field_errors || error.message,
    });
  }
};
