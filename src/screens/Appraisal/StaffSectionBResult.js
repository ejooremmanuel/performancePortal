/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import AppraisalHeadingB from "../../components/AppraisalHeading/AppraisalHeadingB";
import { BASE_URL } from "../../config";
import {
  acceptResult,
  rejectResult,
} from "../../redux/actions/appraisal.actions";

const StaffSectionBResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [perspective, setPerspective] = React.useState([]);
  const [rejected, setRejected] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  const onAccept = () => {
    acceptResult(setLoading);
  };
  const onReject = () => {
    rejectResult(setLoading);
  };

  const next = () => {
    setIndex((prev) => {
      return prev + 1;
    });
    // onNextClick();
  };

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/result/current`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((res) => {
        console.log(res.data.data.status);
        if (res.data.data.status === "Accepted") {
          setAccepted(true);
        } else if (res.data.data.status === "Rejected") {
          setRejected(true);
        }
      });
  }, [navigate]);

  React.useEffect(() => {
    setFetching(true);
    axios
      .get(`${BASE_URL}/api/v1/score/current`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        setList(response.data.data.filter(({ _qid }) => _qid === "Initiative"));
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/perspective`)
      .then(({ data }) => {
        setPerspective(data.data);
      })
      .catch((err) => {
        console.log(err);
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
            <strong>SECTION B: 360 DEGREE PERFORMANCE REVIEW</strong>
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
                    // eslint-disable-next-line no-empty-pattern
                    .filter(({}, i) => {
                      return i === index;
                    })
                    .map((item, i) => {
                      return (
                        <div key={item._id}>
                          <AppraisalHeadingB
                            title={
                              perspective.filter(
                                ({ _id }) => _id === item.question.perspective
                              )[0].title
                            }
                            target={item.question.target}
                            objective={item.question.objective}
                            measures={item.question.measures}
                            initiative={item.question.initiative}
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
                              <div style={{ display: "flex", gridGap: "20px" }}>
                                <Button
                                  onClick={() => {
                                    navigate("/appraisal/result/section/a");
                                  }}
                                  leftIcon={<ArrowBackIcon />}
                                  colorScheme="blue"
                                >
                                  Goto Section A
                                </Button>
                                <Button
                                  onClick={() => {
                                    next();
                                  }}
                                  rightIcon={<ArrowForwardIcon />}
                                  colorScheme="green"
                                >
                                  Next
                                </Button>
                              </div>
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
                                        onAccept();
                                      }}
                                      colorScheme="green"
                                      isDisabled={rejected ? true : accepted}
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      type="submit"
                                      onClick={(e) => {
                                        onReject();
                                      }}
                                      colorScheme="red"
                                      isDisabled={accepted ? true : rejected}
                                    >
                                      Reject
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
                <div>is yet to start Appraisal Section B</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StaffSectionBResult;
