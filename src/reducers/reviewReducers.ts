import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export interface AddReview {
  rating: any;
  comment: string;
  bookId: any;
}

const addReviewInitailState: AddReview = {
  bookId: "",
  comment: "",
  rating: "",
};

export const createReviewReducer = (
  state = addReviewInitailState,
  action: any
) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case CREATE_REVIEW_SUCCESS:
    case CREATE_REVIEW_FAIL:
      return { ...action.payload };
    default:
      return state;
  }
};
