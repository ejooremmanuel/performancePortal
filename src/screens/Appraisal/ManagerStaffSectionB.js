/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
// import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Greeting, Header, Navigation } from "../../components";
import AppraisalHeadingB from "../../components/AppraisalHeading/AppraisalHeadingB";
import {
  patchStaffScore,
  getManagerResultB,
} from "../../redux/actions/appraisal.actions";
// import loadingSpinner from "../../assets/loading.gif";
import { BASE_URL } from "../../config";
// import { UserContext } from "../../context/UserContext";
import swal from "sweetalert";

const ManagerStaffSectionB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } =
    JSON.parse(localStorage.getItem("staffRecord")) &&
    JSON.parse(localStorage.getItem("staffRecord"));

  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [question, setQuestion] = React.useState();
  const [perspective, setPerspective] = React.useState([]);
  const [staff, setStaff] = React.useState({});
  // const { quarter } = React.useContext(UserContext);
  const [rejected, setRejected] = React.useState(false);
  const onNextClick = () => {
    setChecked(JSON.parse(localStorage.getItem("mb"))[index + 1]);
  };
  const onPrevClick = () => {
    setChecked(JSON.parse(localStorage.getItem("mb"))[index - 1]);
  };

  const onChange = (e, questionId) => {
    localStorage.setItem(
      "mb",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("mb")),
        [index]: e.target.value,
        question: questionId,
      })
    );
    setChecked(e.target.value);
  };

  const onSubmit = (staffid, questionId, next) => {
    const data = {
      question: questionId,
      _qid: "Initiative",
      score: question,
      section: "B",
    };
    dispatch(patchStaffScore(staffid, questionId, data, next));
  };

  const onReset = () => {
    localStorage.setItem("mb", JSON.stringify({}));
    setChecked(null);
    setIndex(0);
  };

  const next = () => {
    setIndex((prev) => {
      return prev + 1;
    });
    onNextClick();
  };

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/score/staff/${id}`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        setList(response.data.data.filter(({ _qid }) => _qid === "Initiative"));
      });
  }, [id]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/${id}`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        setStaff(response.data.data);
      });
  }, [id]);
  // React.useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/v1/result/staff/${id}`, {
  //       headers: {
  //         "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.data[quarter][0].status === "Accepted") {
  //         setRejected(true);
  //       }
  //     });
  // }, [id]);
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/result/manager/staff/${id}`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        if (
          response.data.data.result.length > 0 &&
          response.data.data.result[0].status === "Accepted"
        ) {
          setRejected(true);
        }
      });
  }, [id]);

  React.useEffect(() => {
    if (rejected) {
      swal({
        text: "Staff already rated",
        closeOnClickOutside: false,
        closeOnEsc: false,
        icon: "info",
      }).then((ok) => {
        if (ok) {
          navigate("/manager/score/a");
        }
      });
    }
  }, [rejected]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/option`)
      .then(({ data }) => {
        setOptions(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/perspective`)
      .then(({ data }) => {
        setPerspective(data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
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
            <strong>
              SECTION B: 360 DEGREE PERFORMANCE REVIEW (MANAGER RATING)
            </strong>
            <br />
            <strong>INSTRUCTIONS:</strong>
            <br /> This form is used to evaluate supervisory, professional and
            Contract employees. Assign a number for each rating within the scale
            and write that number in the corresponding box. Points will be
            totalled and averaged for overall performance score.
            <br />
            <span>
              Staff Name: <strong>{staff.fullname}</strong>
            </span>
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
            >
              Reset
            </Button>
          </section>
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
                        <span>
                          Staff Selection: <strong>{item.score.title}</strong>
                          <br />
                          {item.managerscore && (
                            <>
                              Manager Selection:&nbsp;
                              <strong>{item.managerscore.title}</strong>
                            </>
                          )}
                        </span>
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
                                  checked={
                                    // eslint-disable-next-line eqeqeq
                                    checked == option.value
                                  }
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
                                onSubmit(
                                  item.user._id,
                                  item.question._id,
                                  next
                                );
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
                                  onSubmit(
                                    item.user._id,
                                    item.question._id,
                                    next
                                  );
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
                              >
                                Previous
                              </Button>

                              {loading ? (
                                <Button
                                  type="submit"
                                  disabled
                                  colorScheme="yellow"
                                >
                                  Calculating...
                                </Button>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setLoading(true);
                                    onSubmit(item.user._id, item.question._id);
                                    getManagerResultB(navigate, setLoading);
                                  }}
                                  colorScheme="yellow"
                                  isLoading={loading}
                                  loadingText="Calculating..."
                                >
                                  Finish Staff Appraisal
                                </Button>
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
              <div>{staff.fullname} is yet to start Appraisal Section B</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerStaffSectionB;
