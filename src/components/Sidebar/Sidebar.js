import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { GrDocumentPerformance } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { FcClock } from "react-icons/fc";
import { MdOutlineGroups } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { RiLogoutCircleLine } from "react-icons/ri";
import lotusPic from "../../assets/lotusPic.png";
import "./Sidebar.css";

function Sidebar() {
  const logoutHandler = () => {};

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="company_logo">
          <img src={lotusPic} alt="" />
          <h6>Lotus Beta Analytics</h6>
        </div>
        <div className="sidebar_icons">
          <ul>
            <li>
              <Link to="/dashboard">
                <RiDashboardLine className="sidebarIcons" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <CgProfile className="sidebarIcons" />
                <p>Profile</p>
              </Link>
            </li>

            <li>
              <Link to="/">
                <GrDocumentPerformance className="sidebarIcons" />
                <p>Appraisal</p>
              </Link>
            </li>

            <li>
              <Link to="/">
                <GoCommentDiscussion className="sidebarIcons" />
                <p>Leave Request</p>
              </Link>
            </li>

            <li>
              <Link to="/">
                <FcClock className="sidebarIcons" />
                <p>Clock In</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <MdOutlineGroups className="sidebarIcons" />
                <p>All Staff</p>
              </Link>
            </li>

            <li>
              <Link to="/">
                <ImExit className="sidebarIcons" />
                <p>Exit Interview</p>
              </Link>
            </li>

            <li>
              <Link to="/" onClick={logoutHandler}>
                <RiLogoutCircleLine className="sidebarIcons" />
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
