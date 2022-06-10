/* eslint-disable no-unused-vars */
import { Button } from "@chakra-ui/react";
import React from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import "./appraisal.css";
const ViewResultB = () => {
  const { score } = useParams();
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  const navigate = useNavigate();
  const startOver = () => {
    localStorage.removeItem("userRes");
    navigate("/appraisal");
  };
  const proceed = () => {
    localStorage.removeItem("userRes");
    navigate("/dashboard");
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Appraisal" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <section className="view__score">
          <article>
            <>
              Your Overall Score <br />
              {score}
            </>
          </article>
          <section className="score__btns">
            <div>
              <Button
                colorScheme="green"
                rightIcon={<FaArrowRight />}
                onClick={proceed}
              >
                Goto Dashboard
              </Button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ViewResultB;
