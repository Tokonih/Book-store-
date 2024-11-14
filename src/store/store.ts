// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { accountLoginReducer, accountSignupReducer } from '../reducers/accountReducers';
import bookReducer, { createBookReducer, singleBookReducer } from '../reducers/bookReducers';
import { createReviewReducer } from '../reducers/reviewReducers';
import authorReducer from '../reducers/authorReducer';
import {editProfileReducer, profileReducer} from "../reducers/profileReducers"
import { markReadReducer } from '../reducers/markReadReducer';

const rootReducer = combineReducers({
  accountLogin: accountLoginReducer,
  accountSignup: accountSignupReducer,
  books: bookReducer,
  singleBook: singleBookReducer,
  createBookReducer: createBookReducer,
  createReviewReducer: createReviewReducer,
  authorReducer: authorReducer,
  profileReducer: profileReducer,
  markReadReducer:markReadReducer,
  editProfileReducer:editProfileReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
