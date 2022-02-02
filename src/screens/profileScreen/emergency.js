import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const EmergencyInfo = () => {
    const [emergencyContactName,setEmergencyContactName] = useState("")
    const [emergencyContactEmail,setEmergencyContactEmail] = useState("")
    const [emergencyContactPhone,setEmergencyContactPhone] = useState("")
    const [emergencyContactState,setEmergencyContactState] = useState("")
    const [emergencyContactAddress,setEmergencyContactAddress] = useState("")
    const [relationship,setRelationship] = useState("")
    
    const user = "shola"
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar emergency={styles.remote} />
                    <div className={styles.formContainer}>
                        <form>
                        <div className={styles.inputContainer_}>
                      <label>Emergency Contact Name</label>
                      <input type="text" value={emergencyContactName} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>EmergencyContactEmail</label>
                      <input type="text" value={emergencyContactEmail} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact Phone</label>
                      <input type="text" value={emergencyContactPhone} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact state</label>
                      <input type="email" value={emergencyContactState} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Relationship</label>
                      <input type="text" value={relationship} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact Address</label>
                      <input type="textarea" value={emergencyContactAddress} />
                    </div>
                        </form>
                    <button className={styles.btn}>Save information</button><Link to="/edit/officailInfo"><div className={styles.btn}>Save information</div></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default EmergencyInfo;
