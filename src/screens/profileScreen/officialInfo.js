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
    
    const user = "shola"
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
                      <input type="date" value={resumptionDate} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Position</label>
                      <input type="text" value={position} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Department</label>
                      <input type="text" value={department} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>CUG Number</label>
                      <input type="email" value={cugNumber} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Manager</label>
                      <input type="text" value={Manager} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Location</label>
                      <input type="textarea" value={location} />
                    </div>
                        </form>
                    <button className={styles.btn}>Save information</button> <Link to="/edit/accountInfo"><div className={styles.btn}>Save information</div></Link> 
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default OfficialInfo;
