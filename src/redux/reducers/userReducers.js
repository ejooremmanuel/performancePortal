import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_RESET,
  GET_ME_FAIL,
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_DP_FAIL,
  GET_DP_REQUEST,
  GET_DP_SUCCESS,
} from "../constants/userConstants";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { loading: true };
    case AUTH_SUCCESS:
      return { loading: false, success: true, staffInfo: action.payload };
    case AUTH_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_RESET:
      return {};
    default:
      return state;
  }
};

export const meReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ME_REQUEST:
      return { loading: true };
    case GET_ME_SUCCESS:
      return {
        loading: false,
        success: true,
        staff: action.payload.data.staff,
        photo: action.payload.data.photo,
      };
    case GET_ME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dpReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DP_REQUEST:
      return { loading: true };
    case GET_DP_SUCCESS:
      return { loading: false, success: true, dp: action.payload.photo };
    case GET_DP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
