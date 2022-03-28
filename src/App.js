import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LoginScreen,
  Dashboard,
  Profile,
  BasicInfo,
  Appraisal,
  CreateAppraisal,
  AppraisalA,
  AppraisalB,
  ViewResult,
  ViewResultB,
  AppraisalReport,
  Initiative,
} from "./screens";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/profile/basicInfo" exact element={<BasicInfo />} />
          <Route path="/appraisal" exact element={<Appraisal />} />
          <Route path="/appraisal/section/a" exact element={<AppraisalA />} />
          <Route path="/appraisal/section/b" exact element={<AppraisalB />} />
          <Route path="/appraisal/create" exact element={<CreateAppraisal />} />
          <Route path="/appraisal/initiative" exact element={<Initiative />} />
          <Route path="/user/score/a/:score" exact element={<ViewResult />} />
          <Route path="/user/score/b/:score" exact element={<ViewResultB />} />
          <Route
            path="/hr/report/appraisal"
            exact
            element={<AppraisalReport />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
