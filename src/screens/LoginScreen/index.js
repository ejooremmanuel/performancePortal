import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import MicrosoftLogin from "react-microsoft-login";
import logo from "../../assets/purple.png";
import { useSelector, useDispatch } from "react-redux";
import { getDp, userLogin } from "../../redux/actions/userActions";
import { CircularProgress, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AUTH_RESET } from "../../redux/constants/userConstants";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  //   Microsoft SSO
  const authHandler = (err, data, msal) => {
    if (err) {
      toast({
        title: "Error",
        description: err,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (data) {
      const accessToken = data.accessToken;
      console.log(data);
      dispatch(userLogin(accessToken));
      dispatch(getDp(accessToken));

      sessionStorage.clear();
    }
  };

  const auth = useSelector((state) => state.auth);
  const { staffInfo, error, loading } = auth;

  // if token exist redirect to dashboard
  useEffect(() => {
    if (staffInfo) {
      navigate("/dashboard");
    }
  }, [navigate, staffInfo]);

  // if error login
  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: AUTH_RESET });
  }

  return (
    <div className={styles.loginBg}>
      <div className={styles.form}>
        <img src={logo} alt="LBAN" />
        <h1>Lotus Beta Analytics Nigeria</h1>
        <h3>Employee's Portal</h3>
        {loading ? (
          <CircularProgress isIndeterminate color="purple.500" />
        ) : (
          <MicrosoftLogin
            clientId={process.env.REACT_APP_CLIENTID}
            authCallback={authHandler}
            // useLocalStorageCache={true}
          />
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
