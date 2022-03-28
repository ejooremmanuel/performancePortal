import axios from "axios";
import {
  START_CREATE_SCORE,
  CREATE_SCORE_SUCCESS,
  CREATE_SCORE_FAIL,
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
        url: "http://localhost:8000/api/v1/score",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": token.token,
        },
        data: data,
      };
      const res = await axios(config);
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
export const createScoreB = (data, next) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_CREATE_SCOREB,
      });
      const token = JSON.parse(localStorage.getItem("staffInfo"));
      const config = {
        url: "http://localhost:8000/api/v1/score",
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

export const getResult = async (navigate, setLoading) => {
  try {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    const res = await axios.post("/api/v1/result/", {}, config);
    console.log(res.data);
    setLoading(false);
    localStorage.removeItem("userRes");
    navigate(`/user/score/a/${res.data.data.score}`);
  } catch (err) {
    console.log(err);
    setLoading(false);
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

    const res = await axios.post("/api/v1/result/", {}, config);
    console.log(res.data);
    setLoading(false);
    localStorage.removeItem("userResB");
    navigate(`/user/score/b/${res.data.data.score}`);
  } catch (err) {
    console.log(err);
    setLoading(false);
    return err;
  }
};
