import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const BasicProfileInfo = () => {
    const [firstName,setFirstName] = useState("")
    const [middleName,setMiddleName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [date,setDate] = useState("")
    const [gender,setGender] = useState("")
    const [mobile,setMobile] = useState("")
    const [state,setState] = useState("")
    const [address,setAddress] = useState("")
    const [bio,setBio] = useState("")
    const user = "shola"
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar basic={styles.remote} />
                    <div className={styles.formContainer}>
                        <form>
                        <div className={styles.inputContainer_}>
                      <label>Firstname</label>
                      <input type="text" value={firstName} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Middlename</label>
                      <input type="text" value={middleName} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Lastname</label>
                      <input type="text" value={lastName} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Email</label>
                      <input type="email" value={email} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Date of Birth</label>
                      <input type="date" value={date} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Gender</label>
                      <input type="date" value={gender} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Mobile Number</label>
                      <input type="email" value={mobile} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>State of Origin</label>
                      <input type="email" value={state} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Address</label>
                      <input type="textarea" value={address} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Tell us Briefly about {user && user.firstName}</label>
                      <input type="textarea" value={bio} />
                    </div>
                        </form>
                    <button className={styles.btn}>Save information</button> <Link to="/edit/emergencyInfo"><div className={styles.btn}>Save information</div></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default BasicProfileInfo;
