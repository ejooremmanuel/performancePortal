import axios from "axios";
import React from "react";
import { FiCamera } from "react-icons/fi";

const HeaderImageUpload = () => {
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
    <>
      <div className="header__details">
        <img src={img} alt="" />
        <label htmlFor="upload" className="uploadDp">
          <FiCamera />
        </label>
        <input
          type="file"
          id="upload"
          style={{ display: "none" }}
          onChange={(event) => {
            uploadDp(event);
          }}
        />
      </div>
    </>
  );
};

export default HeaderImageUpload;
