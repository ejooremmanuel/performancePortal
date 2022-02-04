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
    const submitHandler = () =>{

    }
    
  return <div >
        <div> 
            <Header pageName="Edit Profile"/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar emergency={styles.remote} />
                    <div className={styles.formContainer}>
                        <form onSubmit={submitHandler}>
                        <div className={styles.inputContainer_}>
                      <label>Emergency Contact Name</label>
                      <input type="text" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact Email</label>
                      <input type="text" value={emergencyContactEmail} onChange={(e) => setEmergencyContactEmail(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact Phone</label>
                      <input type="text" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)}/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact state</label>
                      <input type="email" value={emergencyContactState} onChange={(e) => setEmergencyContactState(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Relationship</label>
                      <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Emergency Contact Address</label>
                      <textarea type="text" value={emergencyContactAddress} onChange={(e) => setEmergencyContactAddress(e.target.value)}/>
                    </div>
                        </form>
                        <button onClick={submitHandler} className={`${styles.btn} ${styles.lilac}`}>Save information</button> <Link to="/edit/officailInfo"> <div className={`${styles.btn} ${styles.purple}`}>Official Information</div></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default EmergencyInfo;
