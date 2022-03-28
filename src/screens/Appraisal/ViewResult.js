import { Button } from "@chakra-ui/react";
import React from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import "./appraisal.css";
const ViewResult = () => {
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
    navigate("/appraisal/section/b");
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
              Your Score <br />
              {score}
            </>
          </article>
          <section className="score__btns">
            <div>
              <strong>Note:</strong> You will not be allowed to take Section A
              again once you click on the proceed button
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
                Proceed to Section B
              </Button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ViewResult;
