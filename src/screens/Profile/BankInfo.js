import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options, Select } from "../../components";
import styles from "./styles.module.css";
import axios from "axios";
import { BASE_URL } from "../../config";

const BankInfo = () => {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [loading, setLoading] = useState(false);
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
        setBank(data.data.staff.bank);
        setAccountNumber(data.data.staff.accountNumber);
        setAccountName(data.data.staff.accountName);
        setBvn(data.data.staff.bvn);
        setNin(data.data.staff.nin);
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
      bvn,
      nin,
      bank,
      accountNumber,
      accountName,
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
        setBank(data.data.bank);
        setAccountNumber(data.data.accountNumber);
        setAccountName(data.data.accountName);
        setBvn(data.data.bvn);
        setNin(data.data.nin);
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
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
        <Header title="Bank Information" />
        <div className={styles.formContainer}>
          <div className={styles.smContainer}>
            {Options.ProfileLinks.map((item, i) => (
              <Link to={item.url} key={i}>
                <div className={styles.url}>{item.name}</div>
              </Link>
            ))}
          </div>
          <div className={styles.lgContainer}>
            <Select
              title="Select Your Bank"
              options={Options.Banks}
              onChange={(e) => setBank(e.target.value)}
              value={bank}
            />
            <Input
              title="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              type="text"
              //   readOnly={true}
              required={true}
            />
            <Input
              title="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              type="text"
              //   readOnly={true}
              required={true}
            />
            <Input
              title="National Identity Number"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              type="text"
            />
            <Input
              title="Bank Verification Number"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              type="text"
            />
            <div></div>

            {loading ? (
              <button>Updating...</button>
            ) : (
              <button
                onClick={saveDataHandler}
                disabled={(!bank && !accountName && !accountNumber) || fetching}
              >
                Save Information
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
