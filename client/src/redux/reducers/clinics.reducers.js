import * as types from "../constants/clinics.constants";

const initialState = {
  isLoading: false,
  clinic: null,
  reviews: [],
  listClinic: [],
};

const clinicsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CLINIC_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_CLINIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clinic: payload,
        reviews: payload.reviews,
      };

    case types.GET_CLINIC_FAILURE:
      return { ...state, isLoading: false };

    case types.CLINIC_REQUEST:
      return { ...state, isLoading: true };
    case types.CLINIC_SUCCESS:
      return { ...state, isLoading: false, listClinic: payload };
    case types.CLINIC_FAILURE:
      return { ...state, isLoading: false };

    case types.CREATE_REVIEW_REQUEST:
    case types.CREATE_REVIEW_FAILURE:
      return { ...state };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        clinic: {
          ...state.clinic,
          reviews: [...state.clinic.reviews, payload],
        },
      };

    default:
      return { ...state };
  }
};

export default clinicsReducer;
