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

    const submitHandler = () =>{
      
    }
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar basic={styles.remote} />
                    <div className={styles.formContainer}>
                        <form onSubmit={submitHandler}>
                        <div className={styles.inputContainer_}>
                      <label>First Name</label>
                      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Middle Name</label>
                      <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Last Name</label>
                      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Date of Birth</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Gender</label>
      
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                      >
                        <option>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female
                        </option>
                      </select>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Mobile Number</label>
                      <input type="email" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>State of Origin</label>
                      <input type="email" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Address</label>
                      <input type="textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Tell us Briefly about {user} </label>
                      <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                        </form>
                    <button onClick={submitHandler} className={`${styles.btn} ${styles.lilac}`}>Save information</button> <Link to="/edit/emergencyInfo"> <div className={`${styles.btn} ${styles.purple}`}>Emergency information</div></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default BasicProfileInfo;

