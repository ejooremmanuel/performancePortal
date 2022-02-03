import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chart from "../components/Chart/Charts";
import "./Dashboard.css";
import { useState } from "react";
import {
  FcApproval,
  FcDataRecovery,
  FcManager,
  FcSalesPerformance,
} from "react-icons/fc";

const Dashboard = () => {
  const [apprasialScores, setApprasialScores] = useState(40.2);
  const [managerRatings, setManagerRatings] = useState(65.8);
  const [overallRatings, setOverallRatings] = useState(85.1);
  const [hrCallibrations, setHrCallibrations] = useState(48.5);

  return (
    <div>
      <div className="contanier">
        <Sidebar />
        <div>
          <Header title="Dashboard" />
        </div>
        <div className="dashboard_contanier">
          <div className="dashboard_cards">
            <div className="cards_title">My Apprasial Score</div>
            <div className="card_icons">
              <FcApproval />
            </div>
            <h3>40.2</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">Manager Rating</div>
            <div className="card_icons">
              <FcManager />
            </div>
            <h3>65.8</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">Overall Rating</div>
            <div className="card_icons">
              <FcDataRecovery />
            </div>
            <h3>85.1</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">HR Callibration</div>
            <div className="card_icons">
              <FcSalesPerformance />
            </div>
            <h3>48.5</h3>
          </div>
        </div>
        <div className="charts">
          <span className="chart_span">Ratings</span>
          <Chart
            className="chart"
            apprasialScore={apprasialScores}
            managerRating={managerRatings}
            overallRating={overallRatings}
            hrCallibration={hrCallibrations}
          />
          <div className="myteam_container">
            <div className="mytaem_title">
              <div className="mytaem_name">My Team</div>
            </div>
            <div className="myteam_cards"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
