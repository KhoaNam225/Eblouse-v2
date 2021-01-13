import api from "../../apiService";
import * as types from "../constants/reviews.constants";
import { toast } from "react-toastify";

const getRandomReviews = () => async (dispatch) => {
  dispatch({ type: types.GET_RANDOM_REVIEWS_REQUEST, payload: null });
  try {
    const respond = await api.get("/review/");
    const reviews = respond.data.data;

    dispatch({ type: types.GET_RANDOM_REVIEWS_SUCCESS, payload: reviews });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_RANDOM_REVIEWS_FAILURE, payload: null });
  }
};

const reviewsActions = {
  getRandomReviews,
};

export default reviewsActions;
