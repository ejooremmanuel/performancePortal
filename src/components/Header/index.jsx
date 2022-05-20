import React, { useEffect } from "react";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import axios from "axios";

const Header = ({ title, children, name }) => {
  const navigate = useNavigate();
  const photo = JSON.parse(localStorage.getItem("photo"));
  const [img, setImg] = React.useState("");
  const reader = new FileReader();

  React.useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    axios
      .get("/api/v1/staff/auth/", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        setImg(data.data.staff.photo);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
      });
  }, []);

  const uploadDp = (event) => {
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      setImg(reader.result);
      const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
      axios
        .patch(
          "/api/v1/staff/auth/userdp",
          { img: reader.result },
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": `${accessToken}`,
            },
          }
        )
        .then((response) => {
          setImg(response.data.photo);
        });
    };
  };

  return (
    <div className={styles.most__header}>
      <div className={styles.most__profile}>
        <div className={styles.most__title}>
          <h5>{title}</h5>
        </div>
        <div className={styles.most__name}>
          <h5>Welcome {name}</h5>
          <div className={styles.dp}>
            <img src={img} alt="DP" />
          </div>
          <label htmlFor="upload" className="uploadDp">
            <FiCamera />
          </label>
          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={(event) => {
              // reader.readAsBinaryString(event.target.files[0]);

              uploadDp(event);
            }}
          />
        </div>
      </div>
      <div className={styles.most__children}>{children}</div>
    </div>
  );
};

export default Header;
