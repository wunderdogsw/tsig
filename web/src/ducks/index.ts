import { combineReducers } from "redux";

import userReducer from "./user";
import ascentReducer from "./ascent";
import ascentOptionReducer from "./ascentOption";
import notificationReducer from "./notification";

const rootReducer = combineReducers({
  user: userReducer,
  ascents: ascentReducer,
  ascentOptions: ascentOptionReducer,
  notifications: notificationReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
