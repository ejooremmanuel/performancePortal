import axios from "axios";
import { BASE_URL } from "../../config";
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

export const userLogin = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/staff/auth/`,
      { accessToken },
      config
    );
    localStorage.setItem("staffInfo", JSON.stringify(data));

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getMe = (setDepartment) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ME_REQUEST });

    const {
      auth: { staffInfo },
    } = getState();
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${staffInfo.token}`,
        "access-token": `${staffInfo.token}`,
        token: `${accessToken}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/v1/staff/auth/`, config);
    setDepartment(data.data.staff.department);
    dispatch({
      type: GET_ME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ME_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("staffInfo");
  dispatch({ type: AUTH_RESET });
};

export const getDp = (accessToken) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DP_REQUEST });

    const {
      auth: { staffInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${accessToken}`,
        "access-token": `${staffInfo.token}`,
      },
      data: {
        accessToken,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/staff/auth/photo`,
      config
    );
    localStorage.setItem("photo", JSON.stringify(data.photo));
    dispatch({
      type: GET_DP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DP_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
