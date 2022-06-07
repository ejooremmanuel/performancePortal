import axios from "axios";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Header, Options } from "../../components";
import { BASE_URL } from "../../config";
import styles from "./styles.module.css";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [manager, setManager] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");
  // const [branch, setBranch] = useState("");
  const [mobile, setMobile] = useState("");
  const [addresses, setAddress] = useState("");
  const [fetching, setFetching] = useState(false);
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

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
        console.log(data.data.staff);
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
        setProfileImage(data.data.staff.photo);
        setManager(data.data.staff.manager.fullname);
        setRole(data.data.staff.role);
        setDepartment(data.data.staff.department);
        setFetching(false);

        console.log(middleName, email, dob, gender, state, mobile, addresses);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err.message || err.msg);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Basic Information" />
        <div className={styles.formContainer}>
          <div className={styles.smContainer}>
            {Options.ProfileLinks.map((item, i) => (
              <Link to={item.url} key={i}>
                <div className={styles.url}>{item.name}</div>
              </Link>
            ))}
          </div>

          {fetching ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <div className={styles.profile__container}>
              <div className={styles.profile__image}>
                <img src={profileImage} alt="" />
              </div>
              <div className={styles.profile__details}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <h1>
                    {firstName}&nbsp;{lastName}
                  </h1>
                  <span
                    onClick={() => {
                      navigate("/profile/basicInfo");
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit />
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Role:</strong>&nbsp;
                    {role}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Department:</strong>&nbsp;
                    {department}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Manager:</strong>&nbsp;
                    {manager}
                  </span>
                </div>
                <div>
                  <h2>Brief Description</h2>
                  <span>{bio}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
