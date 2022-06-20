import axios from "axios";
import { BASE_URL } from "../../config";
import {
  START_CREATE_SCORE,
  START_PATCH_SCORE,
  CREATE_SCORE_SUCCESS,
  PATCH_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
  PATCH_SCORE_FAIL,
  START_CREATE_SCOREB,
  CREATE_SCORE_SUCCESSB,
  CREATE_SCORE_FAILB,
} from "../constants/appraisal.constants";

export const createScore = (data, next) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_CREATE_SCORE,
      });
      const token = JSON.parse(localStorage.getItem("staffInfo"));
      const config = {
        url: `${BASE_URL}/api/v1/score`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": token.token,
        },
        data: data,
      };

      const [res] = await Promise.all([axios(config)]); //run both axios calls at the same time

      dispatch({
        type: CREATE_SCORE_SUCCESS,
        payload: res.data,
      });
      next();
    } catch (err) {
      dispatch({
        type: CREATE_SCORE_FAIL,
        payload: err,
      });
      //   next();
    }
  };
};
export const patchStaffScore = (staffid, questionid, data, next, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_PATCH_SCORE,
      });
      const token = JSON.parse(localStorage.getItem("staffInfo"));
      const config = {
        url: `${BASE_URL}/api/v1/score/staff/${staffid}/${questionid}`,
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          "access-token": token.token,
        },
        data: data,
      };
      const res = await axios(config);
      dispatch({
        type: PATCH_SCORE_SUCCESS,
        payload: res.data,
      });
      next();
    } catch (err) {
      console.log(err);
      // toast({
      //   status: "error",
      //   description: `error occured while updating score`,
      //   isClosable: true,
      //   duration: 9000,
      // });
      dispatch({
        type: PATCH_SCORE_FAIL,
        payload: err,
      });
      //   next();
    }
  };
};
export const patchStaffScoreFinal = (
  staffid,
  questionid,
  data,
  setLoading,
  navigate
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_PATCH_SCORE,
      });
      const token = JSON.parse(localStorage.getItem("staffInfo"));
      const config = {
        url: `${BASE_URL}/api/v1/score/staff/${staffid}/${questionid}`,
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          "access-token": token.token,
        },
        data: data,
      };
      const res = await axios(config);
      console.log("done>>>>>>", res.data);
      dispatch({
        type: PATCH_SCORE_SUCCESS,
        payload: res.data,
      });
      console.log("next page", res.data);
      getManagerResultB(navigate, setLoading);
    } catch (err) {
      console.log(err);
      // toast({
      //   status: "error",
      //   description: `error occured while updating score`,
      //   isClosable: true,
      //   duration: 9000,
      // });
      dispatch({
        type: PATCH_SCORE_FAIL,
        payload: err,
      });
      //   next();
    }
  };
};
export const createScoreB = (data, next) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_CREATE_SCOREB,
      });
      const token = JSON.parse(localStorage.getItem("staffInfo"));
      const config = {
        url: `${BASE_URL}/api/v1/score`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": token.token,
        },
        data: data,
      };
      const res = await axios(config);
      dispatch({
        type: CREATE_SCORE_SUCCESSB,
        payload: res.data,
      });
      next();
    } catch (err) {
      dispatch({
        type: CREATE_SCORE_FAILB,
        payload: err,
      });
      //   next();
    }
  };
};

export const getManagerResult = async (navigate, setLoading) => {
  try {
    // const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": token,
    //   },
    // };

    // const res = await axios.post(`${BASE_URL}/api/v1/result/`, {}, config);

    setLoading(false);
    localStorage.removeItem("m");
    navigate(`/manager/rating/b/`);
  } catch (err) {
    console.log(err);
    setLoading(false);
    return err;
  }
};
export const getManagerResultB = async (navigate, setLoading) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    const res = await axios.post(`${BASE_URL}/api/v1/result/`, {}, config);
    setLoading(false);
    localStorage.removeItem("mb");
    navigate(
      `/manager/staff/b/${res.data.data.score}/${res.data.data.managerscore}`
    );
  } catch (err) {
    console.log(err);
    setLoading(false);
    return err;
  }
};
export const getResult = async (navigate, setLoading, swal) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    await axios.post(
      `${BASE_URL}/api/v1/check/section/a/result`,
      {
        status: "Completed",
      },
      config
    );
    // console.log(res.data);
    // setLoading(false);
    localStorage.removeItem("userRes");
    // navigate("/appraisal/section/b");
  } catch (err) {
    console.log(err);
    setLoading(false);
    swal(
      "Oops!",
      "We encountered an error while processing your request.",
      "error"
    );
    return err;
  }
};
export const getResultB = async (navigate, setLoading) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    const res = await axios.post(`${BASE_URL}/api/v1/result/`, {}, config);
    setLoading(false);
    localStorage.removeItem("userResB");
    navigate(`/user/score/b/${res.data.data.score}`);
  } catch (err) {
    console.log(err);
    setLoading(false);
    return err;
  }
};

export const acceptResult = async (setLoading, close, setAccepted) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    await axios.patch(`${BASE_URL}/api/v1/result/accept`, {}, config);
    setLoading(false);
    close();
    setAccepted(true);
  } catch (err) {
    console.log(err);
    setLoading(false);
    return err;
  }
};
export const rejectResult = async (setLoading, close, setRejected) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    await axios.patch(`${BASE_URL}/api/v1/result/reject`, {}, config);
    setLoading(false);
    setRejected(true);
    close();
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};
