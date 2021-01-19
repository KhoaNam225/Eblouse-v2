import * as types from "../constants/bookings.constants";
import api from "../../apiService";

const getBookingsList = (userId) => async (dispatch) => {
  dispatch({ type: types.GET_BOOKINGS_LIST_REQUEST, payload: null });
  try {
    const res = await api.get(`/bookings/${userId}`);
    const bookingsList = res.data.data;

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    });

    dispatch({ type: types.GET_BOOKINGS_LIST_SUCCESS, payload: bookingsList });
  } catch (error) {
    dispatch({ type: types.GET_BOOKINGS_LIST_FAILURE, payload: null });
  }
};

const bookingsActions = { getBookingsList };

export default bookingsActions;
