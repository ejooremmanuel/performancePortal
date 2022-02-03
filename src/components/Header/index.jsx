import React from "react";
import { Link } from "react-router-dom";
import staffPic from "../../assets/staffPic.png";
import "./Header.css";

function Header({ title }) {
  return (
    <div className="header">
      <div className="header_space">
        <div className="header_title">
          <h4>{title}</h4>
        </div>
        <div className="header_img">
          <img src={staffPic} alt="Staff Pic" />
        </div>
        <div className="user_name">
          <h5>Fonsus</h5>
        </div>
        <div className="header_option">
          <div className="header_btn">
            <Link to="/startappraisal">
              <button>Do you have any Suggetions?</button>
            </Link>
          </div>
          <div className="header_btn2">
            <button>Make a Complaint</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
