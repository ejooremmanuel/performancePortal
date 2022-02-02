import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_RESET,
} from "../constants/userConstants";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { loading: true };
    case AUTH_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload.data };
    case AUTH_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_RESET:
      return {};
    default:
      return state;
  }
};
