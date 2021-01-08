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

const clinicsActions = {
  getClinic,
};

export default clinicsActions;
