import React, { useEffect } from "react";
import { Navigation, Card, Header, Greeting, Chart } from "../../components";
import { FiUsers } from "react-icons/fi";
import {
  BsFillAwardFill,
  BsPersonBadgeFill,
  BsReception4,
} from "react-icons/bs";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegChartBar,
  FaSortAlphaDown,
  FaSuitcase,
  // FaRegClock,
  FaUsers,
  // FaSwimmer,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/actions/userActions";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../config";

const Dashboard = () => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMyTeam } = React.useContext(UserContext);
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {} } = userProfile;
  const [appraisalScore, setAppraisalScore] = React.useState(0);
  const [managerscore, setManagerscore] = React.useState(0);
  const [overallScore, setOverallScore] = React.useState(0);
  const [department, setDepartment] = React.useState("");
  const [team, setTeam] = React.useState([]);
  const [calibration, setCalibration] = React.useState(0);

  useEffect(() => {
    dispatch(getMe(setDepartment));
  }, [dispatch]);

  React.useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("staffInfo")) &&
      JSON.parse(localStorage.getItem("staffInfo")).token;
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`${BASE_URL}/api/v1/result/current`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then(({ data }) => {
        setAppraisalScore(data.data.score);
        setManagerscore(data.data.managerscore);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [department, setMyTeam, navigate]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/employees/all`)
      .then((response) => {
        setTeam(
          response.data.data.filter((item) => item.department === department)
        );
        setMyTeam(
          response.data.data.filter((item) => item.department === department)
        );
      });
  }, [department, setMyTeam]);

  React.useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("staffInfo")) &&
      JSON.parse(localStorage.getItem("staffInfo")).token;
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`${BASE_URL}/api/v1/report/staff`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
        setOverallScore(response.data.data.overall);
        setCalibration(response.data.data.calibration);
      });
  }, [navigate]);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" name={staff.fullname} />
        <Greeting name={staff.fullname} />
        <div className={styles.cardContainer}>
          <Card
            title="Appraisal Score"
            count={appraisalScore}
            Icon={BsFillAwardFill}
            color={styles.red}
            url="/dashboard"
          />
          <Card
            title="Manager Score"
            count={managerscore}
            Icon={BsPersonBadgeFill}
            color={styles.blue}
            url="#"
          />
          <Card
            title="Overall Score"
            count={managerscore}
            Icon={BsReception4}
            color={styles.purple}
            url="#"
          />
          <Card
            title="Calibrated Score"
            count={calibration}
            Icon={BsReception4}
            color={styles.purple}
            url="#"
          />
          <Card
            title="My Team"
            count={team.length}
            Icon={FiUsers}
            color={styles.red}
            url="/team"
          />
        </div>
        <div className={styles.objectContainer}>
          <Chart id={staff && staff._id} />
          <div className={styles.quickLinks}>
            <h2>Quick Links</h2>
            <br />
            <div className={styles.linkContainer}>
              <Link to="/appraisal" className={styles.link}>
                <FaRegChartBar />
                Appraisal
              </Link>
              {/* <Link to="/" className={styles.link}>
                <FaSwimmer />
                Leave Request
              </Link> */}
              <Link to="/appraisal/initiative" className={styles.link}>
                <FaSortAlphaDown />
                Initiatives
              </Link>
              {(staff.role === "HR" ||
                (staff.roles && staff.roles.includes("HR"))) && (
                <Link to="/hr/home" className={styles.link}>
                  <FaSuitcase />
                  HR Portal
                </Link>
              )}
              <Link to="/team" className={styles.link}>
                <FaUsers />
                My Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
