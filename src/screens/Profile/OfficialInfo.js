/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options, Select } from "../../components";
import { NativeSelect } from "../../components/Select";
import { BASE_URL } from "../../config";
import styles from "./styles.module.css";

const OfficialInfo = () => {
  const [cug, setCug] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [branch, setBranch] = useState("");
  const [manager, setManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [managerId, setManagerId] = useState("");
  const toast = useToast();

  const selectBranchHandler = (e) => {
    setBranch(e.target.value);
  };
  const selectDepartmentHandler = (e) => {
    setDepartment(e.target.value);
    setManagerId(JSON.parse(e.target[e.target.selectedIndex].id));
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
        setManagerId(data.data.staff.manager.id);
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

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/departments/`)
      .then(({ data }) => {
        setDepartments(data.results);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
      });
  }, []);

  //form handler
  const saveDataHandler = (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    const data = {
      cug,
      branch,
      department,
      manager: managerId,
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
        setManager((prev) => {
          prev = data.data.manager.fullname;
          return prev;
        });

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
        <form className={styles.formContainer} onSubmit={saveDataHandler}>
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
                  readOnly={true}
                />
              </div>
              <NativeSelect
                title="Select Your Department"
                onChange={selectDepartmentHandler}
                value={department}
                required={true}
              >
                <option value="" disabled>
                  Select Your Department
                </option>
                {departments.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={item.name}
                      id={JSON.stringify(item.manager._id)}
                      // data-manager={JSON.stringify(item.manager._id)}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </NativeSelect>

              {/* {showManagerField && (
                <NativeSelect
                  title="Select Your Manager"
                  onChange={selectManagerHandler}
                  value={selectedManager}
                  required={true}
                >
                  <option value="" disabled>
                    Select Manager
                  </option>
                  {managers.map((item, i) => {
                    return (
                      <option key={i} value={item._id}>
                        {item.fullname}
                      </option>
                    );
                  })}
                </NativeSelect>
              )} */}

              <Select
                title="Select Your Location"
                value={branch}
                onChange={selectBranchHandler}
                options={Options.Locations}
              />

              {loading ? (
                <button>Updating...</button>
              ) : (
                <button
                  // onClick={saveDataHandler}
                  type="submit"
                  disabled={!branch || !department || !managerId}
                >
                  Save Information
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OfficialInfo;
