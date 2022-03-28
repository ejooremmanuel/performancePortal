import React from "react";
import { Header, Navigation, Greeting } from "../../components";
import { useSelector } from "react-redux";
import "./appraisal.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Appraisal = () => {
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  const navigate = useNavigate();

  const startAppraisal = () => {
    navigate("/appraisal/section/a");
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Appraisal" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <div className="appraisal__intro__text">
          <h2>Balanced Scorecard</h2>
          <div>
            The business has adopted th use of a Balanced Scorecard to provide a
            framework to manage resources to achieve the above strategic
            objectives. To grow as business we are going to be driven by better
            learning and innovation, which in turn leads to better internal
            processes, which then improves customer satisfaction, in turn
            improving the company’s financial performance.
            <br />
            <br /> There are <strong>four basic perspectives</strong> to take
            with the KPI balanced scorecard, and in the following hierarchical
            order:
          </div>
          <ul>
            <li>
              <strong>Financial</strong> – Establish KPIs to track the financial
              performance of the company, including individual departments,
              functions, and divisions.
            </li>
            <li>
              <strong>Customer</strong> – KPIs to track customer satisfaction,
              attitudes, and market share goals.
            </li>
            <li>
              <strong>Internal Process </strong> – These KPIs provide metrics
              for the specific internal operational goals needed to meet
              customer objectives.
            </li>
            <li>
              <strong>Learning and Growth or Innovation &nbsp;</strong>-
              Intangible drivers for future success such as human capital,
              organizational capital, training, informational systems, etc.
            </li>
          </ul>
          <section>
            <Button colorScheme="green" onClick={startAppraisal}>
              Start Appraisal
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Appraisal;
