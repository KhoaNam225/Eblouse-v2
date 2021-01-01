import faker from "faker";
import * as types from "../constants/clinics.constants";
import { toast } from "react-toastify";

const getClinic = (clinicId) => async (dispatch) => {
  dispatch({ type: types.GET_CLINIC_REQUEST, payload: null });
  try {
    const clinic = {};
    clinic.name = "Hoa Hao Clinic";
    clinic.specialist = "Eye, nose & throat clinic";
    clinic.address = "232 3/2 Street, ward 9, district 9, HCMC";
    clinic.rating = 4.75;
    clinic.reviewNum = 64;
    clinic.images = [];

    for (let i = 0; i < 5; i++) {
      clinic.images.push(faker.image.business());
    }

    clinic.description = faker.lorem.paragraph();
    clinic.services = ["Medical test", "Endoscopy"];

    clinic.doctors = [];
    for (let i = 0; i < 5; i++) {
      let doctor = {};
      doctor.avatar = faker.image.people();
      doctor.name = faker.name.firstName() + " " + faker.name.lastName();
      doctor.gender = "Female";
      doctor.specialList = "Eye, nose & throat";
      doctor.morning = ["Tuesday, Friday"];
      doctor.afternoon = [];
      doctor.evening = ["Monday", "Wednesday"];
      doctor.pronoun = "Ths.Bs.";

      clinic.doctors.push(doctor);
    }

    clinic.reviews = [];
    for (let i = 0; i < 4; i++) {
      let review = {};
      review.user = {
        name: faker.name.firstName(),
        avatar: faker.image.food(),
      };
      review.date = faker.date.past();
      review.content = faker.lorem.sentence();

      clinic.reviews.push(review);
    }

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });

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
