import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options, Select } from "../../components";
import styles from "./styles.module.css";
import axios from "axios";
import { BASE_URL } from "../../config";

const EmergencyInfo = () => {
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactAddress, setEmergencyContactAddress] = useState("");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  const [emergencyContactState, setEmergencyContactState] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationShip] =
    useState("");

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [fetching, setFetching] = useState(false);

  const toast = useToast();

  // Get user data from server
  React.useEffect(() => {
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
        setEmergencyContactName(data.data.staff.emergencyContactName);
        setEmergencyContactAddress(data.data.staff.emergencyContactAddress);
        setEmergencyContactEmail(data.data.staff.emergencyContactEmail);
        setEmergencyContactPhone(data.data.staff.emergencyContactPhone);
        setEmergencyContactState(data.data.staff.emergencyContactState);
        setEmergencyContactRelationShip(
          data.data.staff.emergencyContactRelationship
        );
        setFetching(false);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setFetching(false);
      });
  }, []);

  const saveDataHandler = (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    const data = {
      emergencyContactName,
      emergencyContactAddress,
      emergencyContactEmail,
      emergencyContactRelationship,
      emergencyContactState,
      emergencyContactPhone,
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
        setLoading(false);
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });

        setEmergencyContactName(data.data.emergencyContactName);
        setEmergencyContactAddress(data.data.emergencyContactAddress);
        setEmergencyContactEmail(data.data.emergencyContactEmail);
        setEmergencyContactPhone(data.data.emergencyContactPhone);
        setEmergencyContactState(data.data.emergencyContactState);
        setEmergencyContactRelationShip(data.data.emergencyContactRelationship);
      })
      .catch((err) => {
        console.log(err.message || err.msg);
        setLoading(false);
      });
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Emergency Contact Information" />
        <div className={styles.formContainer}>
          <div className={styles.smContainer}>
            {Options.ProfileLinks.map((item, i) => (
              <Link to={item.url} key={i}>
                <div className={styles.url}>{item.name}</div>
              </Link>
            ))}
          </div>
          <div className={styles.lgContainer}>
            <Input
              readOnly={fetching}
              title="Emergency Contact Name"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              type="text"
              //   readOnly={true}
              required={true}
            />
            <Input
              readOnly={fetching}
              title="Emergency Contact Phone"
              value={emergencyContactPhone}
              onChange={(e) => setEmergencyContactPhone(e.target.value)}
              type="number"
            />
            <Input
              readOnly={fetching}
              title="Emergency Contact Email"
              value={emergencyContactEmail}
              onChange={(e) => setEmergencyContactEmail(e.target.value)}
              type="email"
            />
            <Input
              readOnly={fetching}
              title="Emergency Contact Address"
              value={emergencyContactAddress}
              onChange={(e) => setEmergencyContactAddress(e.target.value)}
              type="text"
            />
            <Input
              readOnly={fetching}
              title="Emergency Contact Relationship"
              value={emergencyContactRelationship}
              onChange={(e) => setEmergencyContactRelationShip(e.target.value)}
              type="text"
            />

            <Select
              title="Select Emergency Contact State"
              options={Options.States}
              onChange={(e) => setEmergencyContactState(e.target.value)}
              value={emergencyContactState}
            />

            {loading ? (
              <button>Updating...</button>
            ) : (
              <button onClick={saveDataHandler} disabled={fetching}>
                Save Information
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyInfo;
