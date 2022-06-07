import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import {
  LoginScreen,
  Dashboard,
  Profile,
  BasicInfo,
  Appraisal,
  AppraisalA,
  AppraisalB,
  ViewResult,
  ViewResultB,
  AppraisalReport,
  Initiative,
  ManagerRating,
  ManagerStaff,
  ManagerResult,
  CreateAppraisal,
  Employees,
  BankInfo,
  EducationalInfo,
  OfficialInfo,
  EmergencyInfo,
  Team,
} from "./screens";
import AppraisalResult from "./screens/Appraisal/AppraisalResult";
import ManagerStaffSectionB from "./screens/Appraisal/ManagerStaffSectionB";
import NotifyStaff from "./screens/Appraisal/NotifyStaff";
import StaffSectionAResult from "./screens/Appraisal/StaffSectionAResult";
import StaffSectionBResult from "./screens/Appraisal/StaffSectionBResult";
import Calibrate from "./screens/HR/Calibrate";
import HRDashboard from "./screens/HR/Dashboard";
import StartAppraisal from "./screens/HR/StartAppraisal";

function App() {
  const [myTeam, setMyTeam] = React.useState([]);
  return (
    <UserContext.Provider value={{ myTeam, setMyTeam }}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/team" exact element={<Team />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/profile/basicInfo" exact element={<BasicInfo />} />
          <Route path="/profile/bank" exact element={<BankInfo />} />
          <Route
            path="/profile/education"
            exact
            element={<EducationalInfo />}
          />
          <Route path="/profile/official" exact element={<OfficialInfo />} />
          <Route path="/profile/emergency" exact element={<EmergencyInfo />} />
          <Route path="/appraisal" exact element={<Appraisal />} />
          <Route
            path="/appraisal/result/section/b"
            exact
            element={<StaffSectionBResult />}
          />
          <Route
            path="/appraisal/result/section/a"
            exact
            element={<StaffSectionAResult />}
          />
          <Route path="/appraisal/section/a" exact element={<AppraisalA />} />
          <Route path="/appraisal/section/b" exact element={<AppraisalB />} />
          <Route path="/appraisal/initiative" exact element={<Initiative />} />
          <Route path="/user/score/a/:score" exact element={<ViewResult />} />
          <Route path="/user/score/b/:score" exact element={<ViewResultB />} />
          <Route
            path="/manager/staff/:score/:managerscore"
            exact
            element={<ManagerResult />}
          />
          <Route
            path="/manager/staff/b/:score/:managerscore"
            exact
            element={<NotifyStaff />}
          />
          <Route path="/manager/score/a" exact element={<ManagerRating />} />
          <Route path="/manager/rating/:id" exact element={<ManagerStaff />} />
          <Route
            path="/manager/rating/b/:name/:id"
            exact
            element={<ManagerStaffSectionB />}
          />
          <Route path="/report" exact element={<AppraisalResult />} />
          {/* HR Portal Links */}
          <Route
            path="/hr/report/appraisal"
            exact
            element={<AppraisalReport />}
          />
          <Route path="/hr/home" exact element={<HRDashboard />} />
          <Route path="/appraisal/create" exact element={<CreateAppraisal />} />
          <Route path="/hr/employees" exact element={<Employees />} />
          <Route path="/hr/start" exact element={<StartAppraisal />} />
          <Route path="/hr/calibrate" exact element={<Calibrate />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
