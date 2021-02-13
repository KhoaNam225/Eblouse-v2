import * as types from "../constants/specializations.constants";

const initialState = {
  specializations: [],
  isLoading: false,
};

const specsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SPECIALIZATIONS_REQUEST:
      return { ...state, isLoadng: true };

    case types.GET_SPECIALIZATIONS_SUCCESS:
      return { ...state, isLoading: false, specializations: payload };

    case types.GET_SPECIALIZATIONS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return { ...state };
  }
};

export default specsReducer;
