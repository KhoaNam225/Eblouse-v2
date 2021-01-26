import * as types from "../constants/users.constants";
import faker from "faker";

const userLogin = () => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = "abc@gmail.com";

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });

    dispatch({ type: types.LOGIN_SUCCESS, payload: { user: user } });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
  }
};

const usersAction = {
  userLogin,
};

export default usersAction;
