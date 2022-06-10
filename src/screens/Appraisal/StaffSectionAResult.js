/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FiLoader } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import AppraisalHeading from "../../components/AppraisalHeading/AppraisalHeading";
import { BASE_URL } from "../../config";

const StaffSectionAResult = () => {
  const navigate = useNavigate();

  const { id, name } = useParams();
  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);

  const gotoSectionB = () => {
    navigate("/appraisal/result/section/b");
  };

  const next = () => {
    setIndex((prev) => {
      return prev + 1;
    });
    // onNextClick();
  };

  React.useEffect(() => {
    setFetching(true);
    axios
      .get(`${BASE_URL}/api/v1/score/current`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setList(
          response.data.data.filter((res) => {
            return res._qid === "AppraisalA";
          })
        );
        setFetching(false);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" />
        <Greeting />
        <section className="appraisal__intro__text">
          <div>
            <strong>SECTION A: 360 DEGREE PERFORMANCE REVIEW</strong>
            <br />
            <strong>INSTRUCTIONS:</strong>
            <br /> This form is used to evaluate supervisory, professional and
            Contract employees. Assign a number for each rating within the scale
            and write that number in the corresponding box. Points will be
            totalled and averaged for overall performance score.
            <br />
          </div>
          <section>
            <div className="appraisal__scores__intro">
              <article>
                <h4 className="green">5</h4>
                <h3>Outstanding</h3>
              </article>
              <article>
                <h4 className="blue">4</h4>
                <h3>Superior</h3>
              </article>
              <article>
                <h4 className="pink">3</h4>
                <h3>Fully Acceptable</h3>
              </article>
              <article>
                <h4 className="orange">2</h4>
                <h3>Conditional</h3>
              </article>
              <article>
                <h4 className="red">1</h4>
                <h3>Unsatisfactory</h3>
              </article>
            </div>
          </section>
          {fetching ? (
            <div>Fetching...</div>
          ) : (
            <div>
              {list.length > 0 ? (
                <>
                  {list
                    .filter((item, i) => {
                      return i === index;
                    })
                    .map((item, i) => {
                      return (
                        <div key={item._id}>
                          <AppraisalHeading
                            title={item.question.title}
                            description={item.question.description}
                            number={index + 1}
                            total={list.length}
                          />
                          <div>
                            Your Selection: <strong>{item.score.title}</strong>
                          </div>
                          <div>
                            Your Manager's Selection:
                            <strong>{item.managerscore.title}</strong>
                          </div>

                          <>
                            {index === 0 ? (
                              <Button
                                onClick={() => {
                                  next();
                                }}
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme="green"
                              >
                                Next
                              </Button>
                            ) : index > 0 && index !== list.length - 1 ? (
                              <div style={{ display: "flex", gridGap: "20px" }}>
                                <Button
                                  onClick={() => {
                                    //   onPrevClick();
                                    setIndex((prev) => {
                                      return prev - 1;
                                    });
                                  }}
                                  leftIcon={<ArrowBackIcon />}
                                  colorScheme="orange"
                                >
                                  Previous
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    next();
                                  }}
                                  rightIcon={<ArrowForwardIcon />}
                                  colorScheme="green"
                                >
                                  Next
                                </Button>
                              </div>
                            ) : index === list.length - 1 ? (
                              <div style={{ display: "flex", gridGap: "20px" }}>
                                <Button
                                  onClick={() => {
                                    //   onPrevClick();
                                    setIndex((prev) => {
                                      return prev - 1;
                                    });
                                  }}
                                  leftIcon={<ArrowBackIcon />}
                                  colorScheme="orange"
                                >
                                  Previous
                                </Button>
                                {loading ? (
                                  <Button
                                    colorScheme="yellow"
                                    leftIcon={<FiLoader />}
                                  >
                                    Fetching score...
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      type="submit"
                                      onClick={(e) => {
                                        gotoSectionB();
                                      }}
                                      colorScheme="green"
                                    >
                                      Go to Section B
                                    </Button>
                                  </>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div>{name} is yet to start Appraisal Section A</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StaffSectionAResult;
