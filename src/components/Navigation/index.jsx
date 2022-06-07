/* eslint-disable eqeqeq */
import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaUserCircle,
  FaRegChartBar,
  FaVoteYea,
  FaSortAlphaDown,
  // FaWalking,
  // FaRegClock,
  // FaUsers,
  FaSignOutAlt,
  // FaSwimmer,
  FaBook,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Tooltip } from "..";
import { logout } from "../../redux/actions/userActions";
import { UserContext } from "../../context/UserContext";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const [staff, setStaff] = useState({});
  const [role, setRole] = useState("Staff");
  const { appraisalStarted } = React.useContext(UserContext);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    axios
      .get("/api/v1/staff/auth/", {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(({ data }) => {
        setStaff(data.data.staff);
        setRole(data.data.staff.role);
      });
  }, []);

  console.log(role);

  return (
    <div className={styles.hra__navigation}>
      <div className={styles.hra__logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.hra__links}>
        <ul>
          <Tooltip text="Dashboard">
            <li>
              <Link to="/dashboard">
                <FaThLarge />
              </Link>
            </li>
          </Tooltip>
          <Tooltip text="Profile">
            <li>
              <Link to="/profile">
                <FaUserCircle />
              </Link>
            </li>
          </Tooltip>
          {toggle ? (
            <Tooltip text="Appraisal">
              <li className={styles.open} onClick={() => setToggle(false)}>
                <span>
                  <FaRegChartBar />
                </span>
              </li>
            </Tooltip>
          ) : (
            <Tooltip text="Appraisal">
              <li className={styles.open} onClick={() => setToggle(true)}>
                <span>
                  <FaRegChartBar />
                </span>
              </li>
            </Tooltip>
          )}
          {appraisalStarted ? (
            <div
              className={toggle ? styles.hra__showGuest : styles.hra__hideGuest}
            >
              <ul>
                {role == "Manager" && (
                  <Tooltip text="Appraise Staff">
                    <li>
                      <Link to="/manager/score/a">
                        <FaRegChartBar />
                      </Link>
                    </li>
                  </Tooltip>
                )}
                <Tooltip text="Start Appraisal">
                  <li>
                    <Link to="/appraisal">
                      <FaVoteYea />
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip text="Appraisal Result">
                  <li>
                    <Link to="/report">
                      <FaBook />
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip text="Initiatives">
                  <li>
                    <Link to="/appraisal/initiative">
                      <FaSortAlphaDown />
                    </Link>
                  </li>
                </Tooltip>
              </ul>
            </div>
          ) : (
            <div
              className={toggle ? styles.hra__showGuest : styles.hra__hideGuest}
            >
              <ul>
                <li>Appraisal Not Started</li>
              </ul>
            </div>
          )}

          {/* <Tooltip text="Leave request">
            <li>
              <Link to="/frontdesk/admin">
                <FaSwimmer />
              </Link>
            </li>
          </Tooltip>
          <Tooltip text="Clockin">
            <li>
              <Link to="/frontdesk/department">
                <FaRegClock />
              </Link>
            </li>
          </Tooltip>
          <Tooltip text="Exit Interview">
            <li>
              <Link to="/frontdesk/logs">
                <FaWalking />
              </Link>
            </li>
          </Tooltip> */}
          <Tooltip text="Logout">
            <li>
              <Link to="/#logout" onClick={logoutUser}>
                <FaSignOutAlt />
              </Link>
            </li>
          </Tooltip>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
