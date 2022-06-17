import axios from "axios";
import { Check, Error } from "@material-ui/icons";
import { FiSearch } from "react-icons/fi";
import { PeopleOutlineSharp } from "@mui/icons-material";
import React from "react";
import Card from "../../components/Card";
import HRNavbar from "../../components/HR Navbar";
import "./hr.styles.css";
import styles from "../Dashboard/styles.module.css";
// import { recentActivites } from "../../components/recent";
import HeaderImageUpload from "./HeaderImageUpload";
import { BASE_URL } from "../../config";
import Logs from "./Logs";
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
  const [numberOfEmployees, setNumberOfEmployees] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("staffInfo")) &&
      JSON.parse(localStorage.getItem("staffInfo")).token;
    if (!token) {
      navigate("/");
      return;
    } else
      axios
        .get(`${BASE_URL}/api/v1/staff/auth/employees/all`, {
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
        })
        .then(({ data }) => {
          setNumberOfEmployees(data.data.length);
        })
        .catch((error) => {
          console.log(error.response);
        });
  }, [navigate]);
  return (
    <div style={{ overflowX: "hidden" }}>
      <HRNavbar />
      <div className="hr__dashboard__container">
        <HRHeader />
        <div className="hr__dashboard__text">
          <h1>Dashboard</h1>
        </div>
        <div className="hr__dashboard__cards">
          <Card
            title="Employees"
            count={numberOfEmployees}
            Icon={PeopleOutlineSharp}
            url="/hr/employees"
            color={styles.red}
          />
          <Card
            title="Yet to Complete"
            count={0}
            Icon={Error}
            url="/hr/home"
            color={styles.blue}
          />
          <Card
            title="Completed"
            count={0}
            Icon={Check}
            url="/hr/home"
            color={styles.purple}
          />
        </div>
        <div className="dashboard__activities">
          <h1
            style={{
              padding: "10px",
              borderBottom: "1px solid rgba(95, 94, 94, 0.1)",
              width: "100%",
              fontSize: "1.3rem",
              color: "rgba(95, 94, 94, 0.6)",
            }}
          >
            Recent Activities
          </h1>

          <Logs />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HRDashboard;

export function HRHeader() {
  return (
    <div className="hr__dashboard__header">
      <div className="header__search">
        <FiSearch />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="header__divider"></div>
      <HeaderImageUpload />
    </div>
  );
}
