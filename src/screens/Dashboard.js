import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chart from "../components/Chart/Charts";
import "./Dashboard.css";
import Icon1 from "../assets/Icon1.jpg";
import Icon2 from "../assets/Icon2.jpg";
import Icon3 from "../assets/Icon3.png";
import Icon4 from "../assets/Icon4.jpg";
import user from "../assets/user.png";
import { useState } from "react";
import {
  FcApproval,
  FcDataRecovery,
  FcManager,
  FcSalesPerformance,
} from "react-icons/fc";
// import Widget from "../components/Widget/Widget";

const Dashboard = () => {
  const [apprasialScores] = useState(40.2);
  const [managerRatings] = useState(65.8);
  const [overallRatings] = useState(85.1);
  const [hrCallibrations] = useState(48.5);

  return (
    <div className="container">
      <div className="sidebarContainer">
        <Sidebar />
      </div>
      <div className="right">
        <div>
          <Header title="Dashboard" />
        </div>
        <div className="gridbox__container">
          <div className="card__container">
            <div className="eachcard1__container">
              <span>General Score Card</span>
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
            </div>

            <div className="eachcard1__container">
              <div className="Twocontainer">
                <div className="teams__header">My Team</div>
                <div className="rowy">
                  <div className="teams__container">
                    <div className="teams__img">
                      <img src={user} alt="User" />
                    </div>
                    <div className="teams__content">
                      <div className="teams__details">
                        <header>Fonsus Ali</header>
                        <p>IT Specialist</p>
                        <p>fonsus@yahoo.com</p>
                        <p>08032442148</p>
                      </div>
                    </div>
                  </div>
                  <div className="teams__container2">
                    <div className="teams__img">
                      <img src={user} alt="User" />
                    </div>
                    <div className="teams__content">
                      <div className="teams__details">
                        <header>Tunji Abidoye</header>
                        <p>IT Specialist</p>
                        <p>tunji@yahoo.com</p>
                        <p>07031142148</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="viewTeam__btn">
                  View Team
                </button>
              </div>
            </div>
            {/* <div className="myTeam__container">
                <div className="myTeam__title">My Team</div>
                <header>Name</header>
                <div>
                  <p>Fonsus Ali</p>
                </div>
              </div> */}

            <div className="eachcard1__container">
              <span className="chart_span">Performance Chart</span>
              <div className="chart__container">
                <div className="charts">
                  <div className="chart">
                    <Chart
                      apprasialScore={apprasialScores}
                      managerRating={managerRatings}
                      overallRating={overallRatings}
                      hrCallibration={hrCallibrations}
                    />
                  </div>
                  <div className="rating__picker">
                    <div className="picker__cards">
                      <div className="color__details">
                        <img src={Icon1} alt="My Appraisal" />
                        <span>My Appraisal Score</span>
                      </div>
                      <div className="color__details">
                        <img src={Icon2} alt="My Appraisal" />
                        <span>Manager Rating</span>
                      </div>
                      <div className="color__details">
                        <img src={Icon3} alt="My Appraisal" />
                        <span>Overall Rating</span>
                      </div>
                      <div className="color__details">
                        <img src={Icon4} alt="My Appraisal" />
                        <span>HR Callibration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="eachcard1__container">
              <span>KPI Details</span>
              <div className="kpi__container">
                <div className="kpi__card">
                  <h1>Cards Container of all items</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* */}
      </div>
      {/* <div className="widgetContainer">
        <Widget />
      </div> */}
    </div>
  );
};

export default Dashboard;
