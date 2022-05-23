/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options, Select } from "../../components";
import styles from "./styles.module.css";

const OfficialInfo = () => {
  const [cug, setCug] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showManagerField, setShowManagerField] = useState(false);
  const [fetching, setFetching] = useState(false);
  const toast = useToast();

  console.log(managers, showManagerField);

  const selectBranchHandler = (e) => {
    setBranch(e.target.value);
  };
  const selectDepartmentHandler = (e) => {
    setDepartment(e.target.value);
  };
  const selectManagerHandler = (e) => {
    console.log(e.target.value);
    setManager(e.target.value);
  };

  console.log(selectManagerHandler);

  const getStaffData = () => {
    setFetching(true);
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    axios
      .get("https://lotusportalapi.herokuapp.com/api/v1/staff/auth/", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        setCug(data.data.staff.cug);
        setDepartment(data.data.staff.department);
        setBranch(data.data.staff.branch);
        setManager(data.data.staff.manager.fullname);
        console.log(data.data.staff.manager.fullname);
        if (data.data.staff.department) {
          setShowManagerField(true);
          const accessToken = JSON.parse(
            localStorage.getItem("staffInfo")
          ).token;
          axios
            .get(
              "https://lotusportalapi.herokuapp.com/api/v1/staff/auth/allstaff",
              {
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: `Bearer ${staffInfo.token}`,
                  "access-token": `${accessToken}`,
                },
              }
            )
            .then(({ data }) => {
              //find manager for staff department
              const foundManagers = data.data.filter((item) => {
                return (
                  item.department === department &&
                  item.role === "Manager" &&
                  item.isManager
                );
              });

              setManagers([{ value: foundManagers.fullname }]);

              for (let { fullname, _id } of foundManagers) {
                console.log(_id);
                setManagers([{ value: fullname, id: _id }]);
                return;
              }
            })
            .catch((err) => {
              console.log(err.message || err.msg);
            });
        }
        setFetching(false);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setFetching(false);
      });
  };

  //get staff data
  React.useEffect(() => {
    getStaffData();
  }, []);

  //form handler
  const saveDataHandler = (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    const data = {
      cug,
      branch,
      department,
      // manager,
    };
    setLoading(true);
    axios
      .patch("https://lotusportalapi.herokuapp.com/api/v1/staff/auth/", data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setCug(data.data.cug);
        setDepartment(data.data.department);
        setBranch(data.data.branch);
        setManager(data.data.manager.fullname);
        setLoading(false);
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setLoading(false);
        toast({
          title: "Error",
          description: "Profile update failed",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      });
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Basic Information" />
        <div className={styles.formContainer}>
          <div className={styles.smContainer}>
            {Options.ProfileLinks.map((item, i) => (
              <Link to={item.url} key={i}>
                <div className={styles.url}>{item.name}</div>
              </Link>
            ))}
          </div>
          {fetching ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <div className={styles.lgContainer}>
              <Input
                title="CUG"
                value={cug}
                onChange={(e) => setCug(e.target.value)}
                type="text"
              />
              <div>
                <Input
                  title="Your Manager"
                  value={manager}
                  // onChange={(e) => setCug(e.target.value)}
                  type="text"
                  disabled={true}
                />
              </div>

              <Select
                title="Select Your Department"
                options={Options.Departments}
                onChange={selectDepartmentHandler}
                value={department}
              />
              <Select
                title="Select Your Location"
                value={branch}
                onChange={selectBranchHandler}
                options={Options.Locations}
              />

              {loading ? (
                <button>Updating...</button>
              ) : (
                <button onClick={saveDataHandler}>Save Information</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialInfo;
