import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options } from "../../components";
import styles from "./styles.module.css";
import axios from "axios";
import { BASE_URL } from "../../config";

const EducationalInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const toast = useToast();

  // Get user data from server
  React.useEffect(() => {
    setFetching(true);
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        setFirstName(data.data.staff.fullname.split(" ")[0]);
        setLastName(data.data.staff.fullname.split(" ")[1]);
        setEmail(data.data.staff.email);
        setDob(data.data.staff.dob);
        setGender(data.data.staff.gender);
        setState(data.data.staff.state);
        setAddress(data.data.staff.address);
        setBio(data.data.staff.bio);
        setMobile(data.data.staff.mobile);
        setMiddleName(data.data.staff.middleName);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setFetching(false);
      });
  }, []);

  const saveDataHandler = (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    const data = {
      middleName,
      dob,
      address,
      mobile,
      state,
      bio,
      gender,
    };
    setLoading(true);
    axios
      .patch("https://lotusportalapi.herokuapp.com/api/v1/staff/auth/", data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setLoading(false);
      });
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Educational Information" />
        <div className={styles.formContainer}>
          <div className={styles.smContainer}>
            {Options.ProfileLinks.map((item, i) => (
              <Link to={item.url} key={i}>
                <div className={styles.url}>{item.name}</div>
              </Link>
            ))}
          </div>
          <div className={styles.lgContainer}>
            <Input
              title="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              //   readOnly={true}
              required={true}
            />
            <Input
              title="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            {loading ? (
              <button>Updating...</button>
            ) : (
              <button onClick={saveDataHandler}>Save Information</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalInfo;
