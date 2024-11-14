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
  ADD_NEW_BOOK
} from "../constants/bookConstants";

interface BookResponse extends ApiResponse {
  books: BookState;
  singleBook: singleBookState;
  createBook: CreateBook;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const createBook = (createBook: {}) => async (dispatch: Dispatch) => {
  const tokenString = sessionStorage.getItem("authToken");
  const useToken = tokenString ? JSON.parse(tokenString) : null;
  
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

    console.log(data)


    dispatch({
      type: CREATE_BOOK_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ADD_NEW_BOOK,
      payload: data, 
    });

  } catch (error: any) {
    dispatch({
      type: CREATE_BOOK_FAIL,
      payload: "Failed to create",
    });
  }
};


export const resetCreateBookState = () => (dispatch: Dispatch) => {
  dispatch({ type: "RESET_CREATE_BOOK_STATE" });
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
