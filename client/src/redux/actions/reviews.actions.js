import faker from "faker";
import * as types from "../constants/reviews.constants";
import { toast } from "react-toastify";

const getReviews = () => async (dispatch) => {
  dispatch({ type: types.GET_REVIEWS_REQUEST, payload: null });
  try {
    const reviews = [];
    for (let i = 0; i < 10; i++) {
      const avatar = faker.image.business();
      const clinicName = faker.company.companyName();
      const address =
        faker.address.streetAddress() +
        " " +
        faker.address.streetName() +
        ", " +
        faker.address.city();
      const desc = faker.company.catchPhraseDescriptor();
      const rating = Math.round(Math.random() * 5 * 100) / 100;
      const comment = faker.lorem.sentence();
      const review = {
        avatar,
        clinicName,
        address,
        desc,
        rating,
        comment,
      };
      reviews.push(review);
    }

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });

    dispatch({ type: types.GET_REVIEWS_SUCCESS, payload: reviews });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_REVIEWS_FAILURE, payload: null });
  }
};

const reviewsActions = {
  getReviews,
};

export default reviewsActions;
