import { Button } from "@chakra-ui/react";
import React from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import "./appraisal.css";
const NotifyStaff = () => {
  const { score, managerscore } = useParams();
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  const navigate = useNavigate();
  const startOver = () => {
    localStorage.removeItem("mb");
    navigate("/manager/score/a");
  };
  const proceed = () => {
    localStorage.removeItem("mb");
    //notify staff then navigate to manager page
    navigate(`/manager/score/a`);
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Appraisal" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <section className="view__score">
          <section
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gridGap: "20px",
            }}
          >
            <article>
              <>
                Staff Score <br />
                {score}
              </>
            </article>
            <article>
              <>
                Manager Score <br />
                {managerscore}
              </>
            </article>
          </section>
          <section className="score__btns">
            <div>
              <strong>Note:</strong> You will not be allowed to re-grade a Staff
              again once you click on the notify button
            </div>
            <div>
              <Button
                colorScheme="red"
                rightIcon={<FaSpinner />}
                onClick={startOver}
              >
                Start Over
              </Button>
              <Button
                colorScheme="green"
                rightIcon={<FaArrowRight />}
                onClick={proceed}
              >
                Notify Staff
              </Button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default NotifyStaff;
