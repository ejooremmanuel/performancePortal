import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Header, Input, Options } from "../../components";
import styles from "./styles.module.css";

const BasicInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
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
          <div className={styles.lgContainer}>
            <Input
              title="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              //   readOnly={true}
              required={true}
            />
            <Input
              title="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
            <Input
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              readOnly={true}
              required={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
