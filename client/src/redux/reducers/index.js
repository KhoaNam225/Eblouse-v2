import { combineReducers } from "redux";
import reviewsReducer from "./reviews.reducers";
import clinicsReducer from "./clinics.reducers";
import usersReducer from "./users.reducres";
import authReducer from "./auth.reducers";

export default combineReducers({
  reviews: reviewsReducer,
  clinics: clinicsReducer,
  users: usersReducer,
  auth: authReducer,
});
