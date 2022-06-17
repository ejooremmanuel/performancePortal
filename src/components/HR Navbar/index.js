import logo from "../../assets/purple.png";
import React from "react";
import {
  FaBook,
  // FaBook,
  FaEdit,
  FaHome,
  FaPlus,
  FaRocket,
  FaSignOutAlt,
  FaThLarge,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Hrnavbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { BsGearFill } from "react-icons/bs";

const HRNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="hrnavbar__container">
      <div className="hrnavbar__container__logo">
        <img src={logo} alt="" />
      </div>
      <div className="hrnavbar__container__links">
        <div
          onClick={() => {
            navigate("/hr/home");
          }}
        >
          <FaHome />
          <span>Home</span>
        </div>
        <div
          onClick={() => {
            navigate("/hr/employees");
          }}
        >
          <FaUsers />
          <span>Employees</span>
        </div>

        <div
          onClick={() => {
            navigate("/hr/start");
          }}
        >
          <FaRocket />
          <span>Start</span>
        </div>

        <div
          onClick={() => {
            navigate("/appraisal/create");
          }}
        >
          <FaPlus />
          <span>Add</span>
        </div>
        <div
          onClick={() => {
            navigate("/hr/report/appraisal");
          }}
        >
          <FaBook />
          <span>Report</span>
        </div>
        <div
          onClick={() => {
            navigate("/hr/calibrate");
          }}
        >
          <FaEdit />
          <span>Calibrate</span>
        </div>
        <div
          onClick={() => {
            navigate("/hr/configure");
          }}
        >
          <BsGearFill />
          <span>Departments</span>
        </div>
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <FaThLarge />
          <span>Staff Portal</span>
        </div>
        <div
          onClick={() => {
            logoutUser();
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default HRNavbar;
