import api from "../../apiService";
import * as types from "../constants/clinics.constants";
import { toast } from "react-toastify";

const getClinic = (clinicId) => async (dispatch) => {
  dispatch({ type: types.GET_CLINIC_REQUEST, payload: null });
  try {
    const response = await api.get(`/clinic/${clinicId}`);
    const clinic = response.data.data;
    console.log(clinic);
    dispatch({ type: types.GET_CLINIC_SUCCESS, payload: clinic });
  } catch (error) {
    dispatch({ type: types.GET_CLINIC_FAILURE, payload: null });
    toast.error(error);
  }
};

const getSearchCategory = (query = null) => async (dispatch) => {
  dispatch({ type: types.CLINIC_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `specialization=${encodeURIComponent(query)}`;
    }

    const res = await api.get(`clinic/search?${queryString}`);

    dispatch({ type: types.CLINIC_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CLINIC_FAILURE, payload: null });
  }
};

const createNewReview = (clinicId, userId, reviewText, rating) => async (
  dispatch
) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/review/clinic/${clinicId}`, {
      userId: userId,
      content: reviewText,
      rating: rating,
    });
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const clinicsActions = {
  getClinic,
  getSearchCategory,
  createNewReview,
};

export default clinicsActions;
