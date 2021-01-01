import * as types from "../constants/reviews.constants";

const initialState = {
  isLoading: false,
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_REVIEWS_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_REVIEWS_SUCCESS:
      return { ...state, isLoading: false, reviews: payload };
    case types.GET_REVIEWS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};

export default reviewsReducer;
