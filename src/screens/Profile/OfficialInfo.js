/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options, Select } from "../../components";
import { CustomSelect } from "../../components/Select";
import { BASE_URL } from "../../config";
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
  const [selectedManager, setSelectedManager] = useState("");
  const toast = useToast();

  console.log(showManagerField);

  const selectBranchHandler = (e) => {
    setBranch(e.target.value);
  };
  const selectDepartmentHandler = (e) => {
    setDepartment(e.target.value);
  };
  const selectManagerHandler = (e) => {
    setSelectedManager(e.target.value);
  };

  // console.log(selectManagerHandler);

  const getStaffData = () => {
    setFetching(true);
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/`, {
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

        if (data.data.staff.department) {
          setShowManagerField(true);
          const accessToken = JSON.parse(
            localStorage.getItem("staffInfo")
          ).token;
          axios
            .get(`${BASE_URL}/api/v1/staff/auth/employees/all`, {
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${staffInfo.token}`,
                "access-token": `${accessToken}`,
              },
            })
            .then((items) => {
              //find manager for staff department
              const foundManagers = items.data.data.filter((item) => {
                return (
                  item.department === data.data.staff.department &&
                  item.role === "Manager"
                );
              });

              for (let i = 0; i < foundManagers.length; i++) {
                // managers.push({ value: fullname, id: _id });
                setManagers((prev) => {
                  return [
                    ...prev,
                    {
                      value: foundManagers[i].fullname,
                      id: foundManagers[i]._id,
                    },
                  ];
                });
              }
            })
            .catch((err) => {
              console.log(err.response.data.msg);
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
      manager: selectedManager,
    };
    setLoading(true);
    axios
      .patch(`${BASE_URL}/api/v1/staff/auth/`, data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${staffInfo.token}`,
          "access-token": `${accessToken}`,
        },
      })
      .then(({ data }) => {
        setCug(data.data.cug);
        setDepartment(data.data.department);
        setBranch(data.data.branch);
        setManager(data.data.manager.fullname);
        setSelectedManager(data.data.manager._id);
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
        setLoading(false);
        toast({
          title: "Error",
          description: `Profile update failed: ${err.response.data.msg}`,
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
        <Header title="Official Information" />
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
                type="number"
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

              {showManagerField && (
                <CustomSelect
                  title="Select Your Manager"
                  options={managers}
                  onChange={selectManagerHandler}
                  value={selectedManager}
                />
              )}
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
              <div></div>

              {loading ? (
                <button>Updating...</button>
              ) : (
                <button
                  onClick={saveDataHandler}
                  disabled={!branch && !department && !selectedManager}
                >
                  Save Information
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialInfo;
