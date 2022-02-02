import React, { useEffect } from "react";
import styles from "./icode.module.css";
import MicrosoftLogin from "react-microsoft-login";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../services/actions/userActions";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AUTH_RESET } from "../services/constants/userConstants";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  //   Microsoft SSO
  const authHandler = (err, data) => {
    const name = data.account.name;
    const email = data.account.userName;
    console.log(data);
    if (err) {
      toast({
        title: "Error",
        description: err,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // dispatch(userLogin(email, name));
    }
  };

  const auth = useSelector((state) => state.auth);
  const { userInfo, error } = auth;

  // if token exist redirect to dashboard
  useEffect(() => {
    // if (userInfo) {
    //   navigate("/dashboard");
    // }
  }, [navigate, userInfo]);

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
      <div className={styles.vector}>
        <img src={logo} alt="LBAN" />
        <h1>Lotus Beta Analytics Nigeria</h1>
        <h3>Employee's Portal</h3>
      </div>
      <div className={styles.form}>
        <h3>Login</h3>
        <img
          src="blob:https://developer.microsoft.com/a7a1aa59-8384-4b37-9a32-ae31589be02e"
          alt=""
        />
        <MicrosoftLogin
          clientId="74371100-2b65-4dbf-b2cd-cfd1b8ec4ebf"
          authCallback={authHandler}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
