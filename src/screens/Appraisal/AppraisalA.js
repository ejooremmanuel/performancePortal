/* eslint-disable eqeqeq */
import axios from "axios";
import React from "react";
import AppraisalHeading from "../../components/AppraisalHeading/AppraisalHeading";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Header, Greeting } from "../../components";
import "./appraisal.css";
import { createScore, getResult } from "../../redux/actions/appraisal.actions";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import swal from "sweetalert";

const AppraisalA = () => {
  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;

  const onNextClick = () => {
    setChecked(JSON.parse(localStorage.getItem("userRes"))[index + 1]);
  };
  const onPrevClick = () => {
    setChecked(JSON.parse(localStorage.getItem("userRes"))[index - 1]);
  };

  const onChange = (e, questionId) => {
    localStorage.setItem(
      "userRes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userRes")),
        [index]: e.target.value,
        question: questionId,
      })
    );
    setChecked(e.target.value);
  };

  const onReset = () => {
    localStorage.setItem("userRes", JSON.stringify({}));
    setChecked(null);
    setIndex(0);
  };

  React.useEffect(() => {
    axios
      .get("/api/v1/check/section/a/result", {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(({ data }) => {
        if (data.data.status === "Completed") {
          swal({
            title: "You have completed Section A.",
            text: "Proceed to Section B",
            icon: "success",
            button: {
              text: "Go",
            },
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((willDelete) => {
            if (willDelete) {
              navigate("/appraisal/section/b");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [navigate]);

  React.useEffect(() => {
    Promise.all([
      axios
        .get("https://lotusportalapi.herokuapp.com/api/v1/option")
        .then((res) => {
          setOptions(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
      axios
        .get("https://lotusportalapi.herokuapp.com/api/v1/section/a")
        .then((res) => {
          setList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  }, []);

  const next = () => {
    setIndex((prev) => {
      return prev + 1;
    });
    onNextClick();
  };

  const onSubmit = (questionId, next) => {
    const data = {
      question: questionId,
      _qid: "AppraisalA",
      score: question,
      section: "A",
    };
    dispatch(createScore(data, next));
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <section className="appraisal__intro__text">
          <div>
            <strong>SECTION A: 360 DEGREE PERFORMANCE REVIEW</strong> <br />
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
            >
              Reset
            </Button>
          </section>
          {list
            .filter((item, i) => {
              return i === index;
            })
            .map((item, i) => {
              return (
                <div key={item._id}>
                  <AppraisalHeading
                    title={item.title}
                    description={item.description}
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
                        >
                          Previous
                        </Button>
                        {loading ? (
                          <Button colorScheme="yellow" leftIcon={<FiLoader />}>
                            redirecting...
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              setLoading(true);
                              onSubmit(item._id);
                              swal({
                                text: "Once you click proceed, you won't be allowed to take section A again.",
                                button: {
                                  text: "Proceed",
                                  closeModal: true,
                                },
                              }).then(async (willSearch) => {
                                if (willSearch) {
                                  return await getResult(swal).then(() => {
                                    localStorage.removeItem("userRes");
                                    setLoading(false);
                                    navigate("/appraisal/section/b");
                                  });
                                } else {
                                  setLoading(false);
                                }
                              });
                            }}
                            colorScheme="yellow"
                          >
                            Proceed to Section B
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
        </section>
      </div>
    </div>
  );
};

export default AppraisalA;
