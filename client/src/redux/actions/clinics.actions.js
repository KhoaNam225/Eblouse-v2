import faker from "faker";
import * as types from "../constants/clinics.constants";
import { toast } from "react-toastify";

const getClinic = (clinicId) => async (dispatch) => {
  dispatch({ type: types.GET_CLINIC_REQUEST, payload: null });
  try {
    const clinic = {};
    clinic.name = faker.company.companyName();
    clinic.specialization = [
      "Eye, Nose & Throat",
      "Cardiologist",
      "Dentist",
      "Dermatology",
    ];
    clinic.address = `${faker.address.streetAddress()} ${faker.address.streetName()}, ${faker.address.city()}`;
    clinic.rating = 4.75;
    clinic.reviewNum = 64;
    clinic.images = [];

    for (let i = 0; i < 5; i++) {
      clinic.images.push(faker.image.business());
    }

    clinic.statement = faker.lorem.paragraph();
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
      doctor.qualification = "Ths.Bs.";

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
      review.rating = Math.floor(Math.random() * 5) + 1;

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
