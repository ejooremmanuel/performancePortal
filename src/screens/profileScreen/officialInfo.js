import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const OfficialInfo = () => {
    const [resumptionDate,setResumptionDate] = useState("")
    const [position,setPosition] = useState("")
    const [department,setDepartment] = useState("")
    const [cugNumber,setCugNumber] = useState("")
    const [location,setLocation] = useState("")
    const [Manager,setManager] = useState("")
    const submitHandler = () =>{
      
    }
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar official={styles.remote} />
                    <div className={styles.formContainer}>
                        <form>
                        <div className={styles.inputContainer_}>
                      <label>Resumption Date</label>
                      <input type="date" value={resumptionDate} onChange={(e) => setResumptionDate(e.target.value)}/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Position</label>
                      <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Department</label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department}
                      >
                        <option>Select</option>
                        <option value="Male">Marketing</option>
                        <option value="Female">Sales
                        </option>
                      </select>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>CUG Number</label>
                      <input type="email" value={cugNumber} onChange={(e) => setCugNumber(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Manager</label>
                      <select
                        onChange={(e) => setManager(e.target.value)}
                        value={Manager}
                      >
                        <option>Select</option>
                        <option value="Male">Lanre Onipede</option>
                        <option value="Female">Sunday Are
                        </option>
                      </select>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Location</label>
                      <select value={location} onChange={(e) => setLocation(e.target.value)} >
                      <option>Select</option>
                        <option value="Male">Lagos</option>
                        <option value="Female">Abuja</option>
                      </select>
                    </div>
                        </form>
                        <button onClick={submitHandler} className={`${styles.btn} ${styles.lilac}`}>Save information</button> <Link to="/edit/accountInfo"> <div className={`${styles.btn} ${styles.purple}`}>Account Information</div></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default OfficialInfo;
