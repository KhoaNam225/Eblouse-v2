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

    default:
      return { ...state };
  }
};

export default bookingsReducer;
