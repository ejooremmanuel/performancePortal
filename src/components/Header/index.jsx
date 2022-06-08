import React from "react";
import styles from "./header.module.css";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../../config";

const Header = ({ title, children, name }) => {
  // const navigate = useNavigate();
  // const photo = JSON.parse(localStorage.getItem("photo"));
  const [img, setImg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
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
        setImg(data.data.staff.photo);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setLoading(false);
      });
  }, []);

  const uploadDp = (event) => {
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    const data = new FormData();
    data.append("profile", event.target.files[0]);
    axios
      .patch(`${BASE_URL}/api/v1/staff/auth/userdp`, data, {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then((response) => {
        setImg(response.data.photo);
      });
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
            {loading ? null : <img src={img} alt="DP" />}
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
              setImg(URL.createObjectURL(event.target.files[0]));

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
