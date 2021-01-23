import * as types from "../constants/bookings.constants";

const initialState = {
  bookings: [],
  isLoading: false,
};

const bookingsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_BOOKINGS_LIST_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_BOOKINGS_LIST_SUCCESS:
      return { ...state, isLoading: false, bookings: payload };

    case types.GET_BOOKINGS_LIST_FAILURE:
      return { ...state, isLoading: false, bookings: [] };

    case types.ACCEPT_BOOKING_REQUEST:
      return { ...state, isLoading: true };

    case types.ACCEPT_BOOKING_SUCCESS:
      return { ...state, isLoading: false, bookings: payload };

    case types.ACCEPT_BOOKING_FAILURE:
      return { ...state, isLoading: false };

    case types.CANCEL_BOOKING_REQUEST:
      return { ...state, isLoading: true };

    case types.CANCEL_BOOKING_SUCCESS:
      return { ...state, isLoading: false, bookings: payload };

    case types.CANCEL_BOOKING_FAILURE:
      return { ...state, isLoading: false };

    case types.CREATE_BOOKING_REQUEST:
      return { ...state, isLoading: true };

    case types.CREATE_BOOKING_SUCCESS:
      return { ...state, isLoading: false, bookigns: payload };

    case types.CREATE_BOOKING_FAILURE:
      return { ...state, isLoading: false };

    default:
      return { ...state };
  }
};

export default bookingsReducer;
