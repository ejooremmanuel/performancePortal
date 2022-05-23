import React, { useEffect } from "react";
import { Navigation, Card, Header, Greeting, Chart } from "../../components";
import { FiUsers } from "react-icons/fi";
import {
  BsFillAwardFill,
  BsPersonBadgeFill,
  BsReception4,
} from "react-icons/bs";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  FaRegChartBar,
  FaSortAlphaDown,
  FaRegClock,
  FaUsers,
  FaSwimmer,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/actions/userActions";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  // Helpers
  const dispatch = useDispatch();
  const { setMyTeam } = React.useContext(UserContext);
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;
  const [appraisalScore, setAppraisalScore] = React.useState(0);
  const [managerscore, setManagerscore] = React.useState(0);
  const [overallScore, setOverallScore] = React.useState(0);
  const [department, setDepartment] = React.useState("");
  const [team, setTeam] = React.useState([]);

  useEffect(() => {
    dispatch(getMe(setDepartment));
  }, [dispatch]);

  React.useEffect(() => {
    axios
      .get("https://lotusportalapi.herokuapp.com/api/v1/result/current", {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(({ data }) => {
        setAppraisalScore(data.data.sectionascore + data.data.sectionbscore);
        setManagerscore(data.data.managerscore);
        setOverallScore(data.data.score);
        axios
          .get(
            "https://lotusportalapi.herokuapp.com/api/v1/staff/auth/employees/all"
          )
          .then((response) => {
            setTeam(
              response.data.data.filter(
                (item) => item.department === department
              )
            );
            setMyTeam(response.data.data);
          });
      });
  }, [department, setMyTeam]);
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" name={staff.fullname} photo={photo} />
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
            url="/frontdesk/guest/awaitingHost"
          />
          <Card
            title="Overall Score"
            count={overallScore}
            Icon={BsReception4}
            color={styles.purple}
            url="/frontdesk/guest/awaitingHost"
          />
          <Card
            title="My Team"
            count={team.length}
            Icon={FiUsers}
            color={styles.red}
            url="/frontdesk/guest/awaitingHost"
          />
        </div>
        <div className={styles.objectContainer}>
          <Chart />
          <div className={styles.quickLinks}>
            <h2>Quick Links</h2>
            <br />
            <div className={styles.linkContainer}>
              <Link to="/appraisal" className={styles.link}>
                <FaRegChartBar />
                Appraisal
              </Link>
              <Link to="/" className={styles.link}>
                <FaSwimmer />
                Leave Request
              </Link>
              <Link to="/appraisal/initiatives" className={styles.link}>
                <FaSortAlphaDown />
                Initiatives
              </Link>
              <Link to="/" className={styles.link}>
                <FaRegClock />
                Clockin
              </Link>
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
