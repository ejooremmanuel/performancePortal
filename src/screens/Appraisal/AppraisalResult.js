/* eslint-disable eqeqeq */
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {
  acceptResult,
  rejectResult,
} from "../../redux/actions/appraisal.actions";
import { useNavigate } from "react-router-dom";
import { Greeting, Header, Navigation, Textarea } from "../../components";
import { Skeleton } from "@chakra-ui/react";
import { BASE_URL } from "../../config";

const AppraisalResult = () => {
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);
  // const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [resultType, setResultType] = React.useState("AppraisalA");
  const [perspective, setPerspective] = React.useState([]);
  const [section, setSection] = React.useState("SECTION A");
  const [rejected, setRejected] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: rejectModal, onOpen: open, onClose: close } = useDisclosure();
  const [hasManagerScore, setHasManagerScore] = React.useState(false);

  const onAccept = () => {
    acceptResult(setLoading, onClose, setAccepted);
  };
  const onReject = () => {
    rejectResult(setLoading, close, setRejected);
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
        if (res.data.data.status === "Accepted" && res.data.data.managerscore) {
          setAccepted(true);
        } else if (res.data.data.status === "Rejected") {
          setRejected(true);
        } else if (res.data.data.managerscore > 0) {
          setHasManagerScore(true);
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
        setList(
          response.data.data.filter((res) => {
            return res._qid === resultType;
          })
        );
        setFetching(false);
      });
  }, [resultType]);

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

  function getPerspective(id) {
    if (id)
      return perspective.filter((item) => {
        return item._id === id;
      })[0].title;
    else return;
  }

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" />
        <Greeting />
        <section className="appraisal__intro__text">
          <div>
            <strong>{section}: 360 DEGREE PERFORMANCE REVIEW</strong>
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
            <div
              style={{
                display: "flex",
                gridGap: "20px",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </>
            </div>
          ) : (
            <table>
              <thead>
                <tr style={{ textAlign: "left", padding: "20px" }}>
                  <th>SN</th>
                  <th>Area</th>
                  <th>Your Selection</th>
                  <th>Your Manager's Selection</th>
                </tr>
              </thead>
              <tbody>
                {resultType === "AppraisalA"
                  ? list.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          style={{ textAlign: "left", padding: "20px" }}
                        >
                          <td>{index + 1}</td>
                          <td>
                            {item.question.title}
                            <br />
                            {item.question.description}
                          </td>
                          <td>{item.score.title}</td>
                          <td>
                            {item.managerscore
                              ? item.managerscore.title
                              : "No Manager rating yet"}
                          </td>
                        </tr>
                      );
                    })
                  : list.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          style={{ textAlign: "left", padding: "20px" }}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <strong>Perspective:</strong> &nbsp;
                            {getPerspective(item.question.perspective)}
                            <br />
                            <strong>target:</strong>&nbsp;
                            {item.question.target}
                            <br />
                            <strong>objective:</strong>&nbsp;
                            {item.question.objective}
                            <br />
                            <strong>measures:</strong>&nbsp;
                            {item.question.measures}
                            <br />
                            <strong> initiative:</strong>&nbsp;
                            {item.question.initiative}
                          </td>
                          <td>{item.score.title}</td>
                          <td>
                            {item.managerscore
                              ? item.managerscore.title
                              : "No Manager rating yet"}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">
                    {resultType === "AppraisalA" ? (
                      <Button
                        onClick={() => {
                          setResultType("Initiative");
                          setSection("SECTION B");
                        }}
                        colorScheme="facebook"
                      >
                        See Section B Report
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            setResultType("AppraisalA");
                            setSection("SECTION A");
                          }}
                          mx={3}
                          colorScheme="facebook"
                        >
                          See Section A Report
                        </Button>

                        {hasManagerScore && (
                          <>
                            <Button
                              onClick={() => {
                                onOpen();
                              }}
                              mx={3}
                              colorScheme="green"
                              isDisabled={rejected ? true : accepted}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={open}
                              mx={3}
                              colorScheme="red"
                              isDisabled={accepted ? true : rejected}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
          <AcceptPermissionModal
            isOpen={isOpen}
            onClose={onClose}
            onAccept={onAccept}
            loading={loading}
          />
          <RejectPermissionModal
            isOpen={rejectModal}
            onClose={close}
            onReject={onReject}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
};

export default AppraisalResult;

export function AcceptPermissionModal({ isOpen, onClose, onAccept, loading }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div
              style={{
                margin: "80px auto",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Are you sure you want to Accept this result?</h3>
              <div>
                <Button onClick={onClose} mx={3}>
                  No
                </Button>
                <Button
                  onClick={onAccept}
                  isLoading={loading}
                  loadingText="Accepting..."
                >
                  Yes
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export function RejectPermissionModal({ isOpen, onClose, onReject, loading }) {
  const [reason, setReason] = React.useState("");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div
              style={{
                margin: "80px auto",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Are you sure you want to Reject this result?</h3>
              <div>
                <Textarea
                  title="Reason for rejection"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </div>
              <div>
                <Button onClick={onClose} mx={3}>
                  No
                </Button>
                <Button
                  onClick={onReject}
                  isLoading={loading}
                  loadingText="Rejecting..."
                >
                  Yes
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
