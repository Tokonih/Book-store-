import {
    GET_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL
  } from "../constants/profileConstants";
  import { AnyAction } from "@reduxjs/toolkit";
  import { ProfileState, initialState, ProfileResponse, EditProfileData } from "../types/profileTypes";
  
  interface ProfileAction {
    type: string;
    payload?: ProfileResponse["data"] | string; 
  }

  interface EditProfileState {
    loading: boolean;
    success: boolean;
    error: string | null;
    profile: EditProfileData | null;
  }
  
  const editProfileInitialState: EditProfileState = {
    loading: false,
    success: false,
    error: null,
    profile: null,
  };
  
  
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
  

  export const editProfileReducer = (
    state = editProfileInitialState,
    action: AnyAction
  ): EditProfileState => {
    switch (action.type) {
      case EDIT_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case EDIT_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          profile: action.payload,
        };
  
      case EDIT_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };