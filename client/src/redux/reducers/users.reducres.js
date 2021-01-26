import * as types from "../constants/users.constants";

const initalState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const usersReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isLoading: false,
        isAuthenticated: false,
      };

    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, isAuthenticated: false };

    default:
      return { ...state };
  }
};

export default usersReducer;
