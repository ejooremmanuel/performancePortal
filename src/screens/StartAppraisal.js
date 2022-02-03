import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Startappraisal.css";

function StartAppraisal() {
  return (
    <div>
      <div className="container">
        <div>
          <Sidebar />
        </div>
        <Header title="Appraisal" />
        <div className="appraisal_container">
          <div className="start_title">
            <div>Start Appraisal</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartAppraisal;
