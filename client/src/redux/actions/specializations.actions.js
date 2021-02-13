import * as types from "../constants/specializations.constants";
import api from "../../apiService";

const getAllSpecializations = () => async (dispatch) => {
  dispatch({ type: types.GET_SPECIALIZATIONS_REQUEST, payload: null });
  try {
    const res = await api.get(`clinic/specs`);
    console.log("SPECS", res.data.data);

    dispatch({
      type: types.GET_SPECIALIZATIONS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SPECIALIZATIONS_FAILURE, payload: null });
  }
};

const specsActions = {
  getAllSpecializations,
};

export default specsActions;
