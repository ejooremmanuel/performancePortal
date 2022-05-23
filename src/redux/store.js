/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, dpReducer, meReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  auth: authReducer,
  userProfile: meReducer,
  userDp: dpReducer,
});

const userInfoFromStorage = localStorage.getItem("staffInfo")
  ? JSON.parse(localStorage.getItem("staffInfo"))
  : null;

const userDetailsFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  auth: { staffInfo: userInfoFromStorage },
  //   userDetails: { user: userDetailsFromStorage },
  //passwordUpdate: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
