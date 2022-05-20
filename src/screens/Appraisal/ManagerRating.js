import axios from "axios";
import React from "react";
import { Header, Navigation, StaffScoreTable } from "../../components";

const ManagerRating = () => {
  const [staffScores, setStaffScore] = React.useState([]);
  const [staffId, setStaffId] = React.useState("");

  React.useEffect(() => {
    axios.get("/api/v1/staff/auth/employees/all").then(({ data }) => {
      setStaffScore(
        data.data.filter((staff) => {
          return staff.manager && staff.manager._id === staffId;
        })
      );
      // setStaffScore(data.data);
    });
  }, [staffId]);

  //Get the authenticated staff id
  React.useEffect(() => {
    axios
      .get("/api/v1/staff/auth", {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(({ data }) => {
        console.log(data.data.staff._id);
        setStaffId(data.data.staff._id);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation />

      <div className="contentsRight">
        <Header title="Manager Appraisal of Staff" />
        <div style={{ width: "100%", height: "100%" }}>
          <StaffScoreTable itemsPerPage={4} list={staffScores} />
        </div>
      </div>
    </div>
  );
};

export default ManagerRating;
