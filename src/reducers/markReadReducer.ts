import { AnyAction } from "@reduxjs/toolkit";
import { MARK_READ_FAIL, MARK_READ_REQUEST, MARK_READ_SUCCESS } from "../constants/markRead";

const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const markReadReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
      case MARK_READ_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case MARK_READ_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
        };
  
      case MARK_READ_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  