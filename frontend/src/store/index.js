import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import thunk from "redux-thunk";

const middleware = [thunk];
let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
