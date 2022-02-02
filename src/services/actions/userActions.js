import axios from "axios";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from "../constants/userConstants";

export const userLogin = (email, name) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/auth/`, { email, name }, config);

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

// export const getMe = (id) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: AUTH_REQUEST });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       const { data } = await axios.get(`/api/v1/staff/`, config);

//       dispatch({
//         type: AUTH_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: AUTH_FAIL,
//         payload:
//           error.response && error.response.data.error
//             ? error.response.data.error
//             : error.message,
//       });
//     }
//   };
