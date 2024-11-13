import { singleBookState } from "../types";
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
import { boolean } from "yup";
import { act } from "react";

interface BookState {
  success: boolean;
  page: number;
  totalPages: number;
  totalBooks: number;
  books: any;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  success: false,
  totalPages: 0,
  totalBooks: 0,
  page: 0,
  books: [],
  loading: false,
  error: null,
};

const singleBookInitialState: singleBookState = {
  success: false,
  book: {
    _id:"",
    title: "",
    images: "",
  },
  loading: false,
  error: null,
};

export interface CreateBook {
  title: string;
  description: string;
  author: string;
  images: string;
}

const createBookInitialState: CreateBook = {
  title: "",
  description: "",
  author: "",
  images: "",
};

export const createBookReducer = (
  state = createBookInitialState,
  action: any
): CreateBook => {
  switch (action.type) {
    case CREATE_BOOK_FAIL:
    case CREATE_BOOK_SUCCESS:
    case CREATE_BOOK_FAIL:
      return { ...action.payload };
    default:
      return state;
  }
};

export const bookReducer = (state = initialState, action: any): BookState => {
  switch (action.type) {
    case "GET_BOOK_REQUEST":
      return { ...state, loading: true };
    case "GET_BOOK_SUCCESS":
      return { ...action.payload };
    // return { ...state, loading: false, data: action.payload };
    case "GET_BOOK_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleBookReducer = (
  state = singleBookInitialState,
  action: any
): singleBookState => {
  switch (action.type) {
    case GET_SINGLE_BOOK_REQUEST:
    case GET_SINGLE_BOOK_SUCCESS:
    case GET_SINGLE_BOOK_FAIL:
      return { ...action.payload };
    default:
      return state;
  }
};

export default bookReducer;
