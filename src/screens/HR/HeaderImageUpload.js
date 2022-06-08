import axios from "axios";
import React from "react";
import { FiCamera } from "react-icons/fi";
import { BASE_URL } from "../../config";

const HeaderImageUpload = () => {
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
    <>
      <div className="header__details">
        {loading ? null : <img src={img} alt="DP" />}

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
    </>
  );
};

export default HeaderImageUpload;
