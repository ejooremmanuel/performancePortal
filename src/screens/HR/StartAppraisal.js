import axios from "axios";
import { FiSearch } from "react-icons/fi";
import React from "react";
import HRNavbar from "../../components/HR Navbar";
import HeaderImageUpload from "./HeaderImageUpload";
import { Options } from "../../components";
import { Button, useToast } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

import "./hr.styles.css";
import { BASE_URL } from "../../config";

const StartAppraisal = () => {
  const date = new Date();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/appraisal/`).then((res) => {
      console.log(res.data);
    });
  }, []);

  const setStartAppraisal = {
    firstQuarter: () => {
      const check = window.confirm(
        "Are you sure you want to start this Appraisal?"
      );

      if (check) {
        setLoading(true);
        axios
          .post(
            `${BASE_URL}/api/v1/appraisal/`,
            {
              quarter: "First Quarter",
              session: date.getFullYear(),
              status: "Started",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                  .token,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            axios
              .patch(
                `${BASE_URL}/api/v1/appraisal/start/${data.data._id}`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    "access-token": JSON.parse(
                      localStorage.getItem("staffInfo")
                    ).token,
                  },
                }
              )
              .then(({ data }) => {
                console.log(data);
                setLoading(false);
              })
              .catch((err) => {
                toast({
                  status: "error",
                  description: err.response.data.msg,
                  isClosable: true,
                  duration: 9000,
                  position: "top-right",
                });
                console.log(err.message);
                setLoading(false);
              });
          })
          .catch((err) => {
            toast({
              status: "error",
              description: err.response.data.msg,
              isClosable: true,
              duration: 9000,
              position: "top-right",
            });
            console.log(err.message);
            setLoading(false);
          });
      }
    },
    secondQuarter: () => {
      const check = window.confirm(
        "Are you sure you want to start this Appraisal?"
      );

      if (check) {
        setLoading(true);
        axios
          .post(
            `${BASE_URL}/api/v1/appraisal/`,
            {
              quarter: "Second Quarter",
              session: date.getFullYear(),
              status: "Started",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                  .token,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setLoading(false);
          })
          .catch((err) => {
            toast({
              status: "error",
              description: err.response.data.msg,
              isClosable: true,
              duration: 9000,
              position: "top-right",
            });
            console.log(err.message);
            setLoading(false);
          });
      }
    },
    thirdQuarter: () => {
      const check = window.confirm(
        "Are you sure you want to start this Appraisal?"
      );

      if (check) {
        setLoading(true);
        axios
          .post(
            `${BASE_URL}/api/v1/appraisal/`,
            {
              quarter: "Third Quarter",
              session: date.getFullYear(),
              status: "Started",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                  .token,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setLoading(false);
          })
          .catch((err) => {
            toast({
              status: "error",
              description: err.response.data.msg,
              isClosable: true,
              duration: 9000,
              position: "top-right",
            });
            console.log(err.message);
            setLoading(false);
          });
      }
    },
    fourthQuarter: () => {
      const check = window.confirm(
        "Are you sure you want to start this Appraisal?"
      );

      if (check) {
        setLoading(true);
        axios
          .post(
            `${BASE_URL}/api/v1/appraisal/`,
            {
              quarter: "Fourth Quarter",
              session: date.getFullYear(),
              status: "Started",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                  .token,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setLoading(false);
          })
          .catch((err) => {
            toast({
              status: "error",
              description: err.response.data.msg,
              isClosable: true,
              duration: 9000,
              position: "top-right",
            });
            console.log(err.message);
            setLoading(false);
          });
      }
    },
  };

  const currentMonth = Options.Months[date.getMonth()];
  return (
    <div style={{ overflowX: "hidden" }}>
      <HRNavbar />
      <div className="hr__dashboard__container">
        <HRHeader />
        <div className="hr__dashboard__text">
          <h1>Start Appraisal</h1>
        </div>
        <div className="StartAppraisal__container">
          {currentMonth === "April" ? (
            <div className="quarter__container">
              <div>Start First Quarter Appraisal for {date.getFullYear()}</div>
              <Button
                isLoading={loading}
                loadingText="Starting..."
                colorScheme="green"
                onClick={setStartAppraisal.firstQuarter}
              >
                Start <FaRocket />
              </Button>
            </div>
          ) : currentMonth === "July" ? (
            <div className="quarter__container">
              <div>Start Second Quarter Appraisal for {date.getFullYear()}</div>
              <Button
                isLoading={loading}
                loadingText="Starting..."
                colorScheme="green"
                onClick={setStartAppraisal.secondQuarter}
              >
                Start <FaRocket />
              </Button>
            </div>
          ) : currentMonth === "October" ? (
            <div className="quarter__container">
              <div>Start Third Quarter Appraisal for {date.getFullYear()}</div>
              <Button
                isLoading={loading}
                loadingText="Starting..."
                colorScheme="green"
                onClick={setStartAppraisal.thirdQuarter}
              >
                Start <FaRocket />
              </Button>
            </div>
          ) : currentMonth === "December" ? (
            <div className="quarter__container">
              <div>Start Fourth Quarter Appraisal for {date.getFullYear()}</div>
              <Button
                isLoading={loading}
                loadingText="Starting..."
                colorScheme="green"
                onClick={setStartAppraisal.fourthQuarter}
              >
                Start <FaRocket />
              </Button>
            </div>
          ) : (
            <div className="quarter__container">Check back</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartAppraisal;

export function HRHeader() {
  return (
    <div className="hr__dashboard__header">
      <div className="header__search">
        <FiSearch />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="header__divider"></div>
      <HeaderImageUpload />
    </div>
  );
}
