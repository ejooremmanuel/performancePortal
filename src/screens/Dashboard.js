import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
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
            <h3>40.2</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">Manager Rating</div>
            <h3>65.8</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">Overall Rating</div>
            <h3>85.1</h3>
          </div>

          <div className="dashboard_cards">
            <div className="cards_title">HR Callibration</div>
            <h3>Satisfactory</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
