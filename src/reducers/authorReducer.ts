import { AuthorResponse } from "../types/authorTypes";
import {
  GET_AUTHOR_REQUEST,
  GET_AUTHOR_SUCCESS,
  GET_AUTHOR_FAIL,
} from "../constants/authorConstants";
import { AnyAction } from "redux";

const initialAuthorState: AuthorResponse = {
  success: false,
  data: {
    _id: "",
    name: "",
    email: "",
    profileImage: null,
    role: "",
    readBooks: [],
    __v: 0,
    books: [],
  },
  loading: false,
  error: null,
};

const authorReducer = (state = initialAuthorState, action: AnyAction) => {
  switch (action.type) {
    case GET_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_AUTHOR_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authorReducer;
