import {
    GET_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
  } from "../constants/profileConstants";
  import { ProfileState, initialState, ProfileResponse } from "../types/profileTypes";
  
  interface ProfileAction {
    type: string;
    payload?: ProfileResponse["data"] | string; 
  }
  
  export const profileReducer = (
    state: ProfileState = initialState,
    action: ProfileAction
  ): ProfileState => {
    switch (action.type) {
      case GET_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: undefined, 
        };
  
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          profile: action.payload as ProfileResponse["data"], 
        };
  
      case GET_PROFILE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload as string, 
        };
  
      default:
        return state;
    }
  };
  