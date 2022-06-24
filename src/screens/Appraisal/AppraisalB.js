/* eslint-disable eqeqeq */
import axios from "axios";
import React from "react";
import AppraisalHeadingB from "../../components/AppraisalHeading/AppraisalHeadingB";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Header, Greeting } from "../../components";
import "./appraisal.css";
import {
  createScoreB,
  getResultB,
} from "../../redux/actions/appraisal.actions";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import swal from "sweetalert";
import { BASE_URL } from "../../config";

const AppraisalB = () => {
  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  const onNextClick = () => {
    setChecked(JSON.parse(localStorage.getItem("userResB"))[index + 1]);
  };
  const onPrevClick = () => {
    setChecked(JSON.parse(localStorage.getItem("userResB"))[index - 1]);
  };

  const onChange = (e, questionId) => {
    localStorage.setItem(
      "userResB",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userResB")),
        [index]: e.target.value,
        question: questionId,
      })
    );
    setChecked(e.target.value);
  };

  const onReset = () => {
    localStorage.setItem("userResB", JSON.stringify({}));
    setChecked(null);
    setIndex(0);
  };

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    setFetching(true);
    axios
      .get(`${BASE_URL}/api/v1/initiative`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
        if (response.data.data.length < 1) {
          swal({
            title: "No data found!",
            text: "Add initiatives to continue!",
            icon: "error",
            button: "OK",
          }).then((ok) => {
            if (ok) {
              navigate("/dashboard");
            }
          });
          return;
        }

        axios.get(`${BASE_URL}/api/v1/perspective`).then(({ data }) => {
          const perspectives = data.data.map(({ title }) => title);

          let foundPerspectivesByStaff = response.data.data.map(
            ({ perspective }) => {
              return perspective.title;
            }
          );

          foundPerspectivesByStaff = [...new Set(foundPerspectivesByStaff)];

          if (
            JSON.stringify(foundPerspectivesByStaff.sort()) ===
            JSON.stringify(perspectives.sort())
          ) {
            setList(response.data.data);
          } else {
            swal({
              title: "Missing Perspective",
              text: "A perspective is missing from your set initiatives! Check your initiatives list and try again.",
              buttons: "Ok",
              icon: "error",
            }).then((ok) => {
              if (ok) {
                navigate("/appraisal/initiative");
              }
            });
          }

          setFetching(false);
        });
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
  }, [navigate]);
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/option`)
      .then((res) => {
        setOptions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/result/current`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((res) => {
        if (res.data.data.sectionbscore) {
          swal({
            title: "You have completed Section B of your Appraisal.",
            icon: "success",
            text: "See your Manager Rating",
            button: {
              text: "Go",
            },
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((ok) => {
            if (ok) {
              navigate("/report");
            }
          });
        }
      });
  }, [navigate]);

  const next = () => {
    setIndex((prev) => {
      return prev + 1;
    });
    onNextClick();
  };

  const onSubmit = (questionId, next) => {
    const data = {
      question: questionId,
      _qid: "Initiative",
      score: question,
      section: "B",
    };
    dispatch(createScoreB(data, next));
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <section className="appraisal__intro__text">
          <div>
            <strong>SECTION B: 360 DEGREE PERFORMANCE REVIEW</strong> <br />
            <strong>INSTRUCTIONS:</strong>
            <br /> This form is used to evaluate supervisory, professional and
            Contract employees. Assign a number for each rating within the scale
            and write that number in the corresponding box. Points will be
            totalled and averaged for overall performance score.
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

            <Button
              colorScheme="red"
              rightIcon={<RepeatIcon />}
              onClick={onReset}
              disabled={loading}
            >
              Reset
            </Button>
          </section>
          {fetching ? (
            <div>Fetching...</div>
          ) : (
            <div>
              {list.length < 1 ? (
                <h4>You have not created any initiative yet!</h4>
              ) : (
                list
                  .filter((item, i) => {
                    return i === index;
                  })
                  .map((item, i) => {
                    return (
                      <div key={item._id}>
                        <AppraisalHeadingB
                          title={item.perspective.title}
                          target={item.target}
                          objective={item.objective}
                          measures={item.measures}
                          initiative={item.initiative}
                          number={index + 1}
                          total={list.length}
                        />
                        {options.map((option) => {
                          return (
                            <div
                              key={option._id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gridGap: "15px",
                              }}
                            >
                              <>
                                <input
                                  type="radio"
                                  name={item.title}
                                  value={option.value}
                                  onChange={(e) => {
                                    onChange(e, item._id, option._id);
                                    setQuestion(option._id);
                                  }}
                                  checked={checked == option.value}
                                />
                                <span>{option.title}</span>
                              </>
                            </div>
                          );
                        })}

                        <>
                          {index === 0 ? (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                onSubmit(item._id, next);
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
                                  onPrevClick();
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
                                  e.preventDefault();
                                  onSubmit(item._id, next);
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
                                  onPrevClick();
                                  setIndex((prev) => {
                                    return prev - 1;
                                  });
                                }}
                                leftIcon={<ArrowBackIcon />}
                                colorScheme="orange"
                                disabled={loading}
                              >
                                Previous
                              </Button>
                              {loading ? (
                                <Button
                                  colorScheme="yellow"
                                  leftIcon={<FiLoader />}
                                >
                                  Fetching your score...
                                </Button>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setLoading(true);
                                    onSubmit(item._id);
                                    swal({
                                      text: "Once you click proceed, you won't be allowed to take section B again.",
                                      button: {
                                        text: "Proceed",
                                        closeModal: true,
                                      },
                                    }).then((willSearch) => {
                                      if (willSearch) {
                                        return getResultB(navigate, setLoading);
                                      } else {
                                        setLoading(false);
                                      }
                                    });
                                  }}
                                  colorScheme="yellow"
                                >
                                  Finish Appraisal
                                </Button>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      </div>
                    );
                  })
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AppraisalB;
