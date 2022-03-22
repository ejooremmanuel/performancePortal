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

const Dashboard = () => {
  // Helpers
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <div className={styles.cardContainer}>
          <Card
            title="Appraisal Score"
            count="10"
            Icon={BsFillAwardFill}
            color={styles.red}
            url="/dashboard"
          />
          <Card
            title="Manager Score"
            count="20"
            Icon={BsPersonBadgeFill}
            color={styles.blue}
            url="/frontdesk/guest/awaitingHost"
          />
          <Card
            title="Overall Score"
            count="20"
            Icon={BsReception4}
            color={styles.purple}
            url="/frontdesk/guest/awaitingHost"
          />
          <Card
            title="My Team"
            count="20"
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
              <Link to="/" className={styles.link}>
                <FaRegChartBar />
                Appraisal
              </Link>
              <Link to="/" className={styles.link}>
                <FaSwimmer />
                Leave Request
              </Link>
              <Link to="/" className={styles.link}>
                <FaSortAlphaDown />
                Initiatives
              </Link>
              <Link to="/" className={styles.link}>
                <FaRegClock />
                Clockin
              </Link>
              <Link to="/" className={styles.link}>
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
