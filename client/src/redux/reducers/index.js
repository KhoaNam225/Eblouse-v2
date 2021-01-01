import { combineReducers } from "redux";
import reviewsReducer from "./reviews.reducers";
import clinicsReducer from "./clinics.reducers";

export default combineReducers({
  reviews: reviewsReducer,
  clinics: clinicsReducer,
});
