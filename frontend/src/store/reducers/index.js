import { combineReducers } from "redux";
import userAuthReducer from "./authReducers";
import homeReducers from "./homeReducers";
import cartReducers from "./cartReducers";

const appReducer = combineReducers({
  user: userAuthReducer,
  home: homeReducers,
  cart: cartReducers,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
