import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../component/data';
import Header from '../../component/header_';

import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const Profile = () => {
   const {firstName,middleName,lastName,email,date,gender,mobile,state,address,bio,resumptionDate,position,department,cugNumber,manager,location} = data[0]
   console.log(data) 
  return <div >
        <div> 
            <Header pageName="My Profile"/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <div className={styles.formContainer}>
                    <div className={styles.profile}>
                       <div className={styles.profileHeader}>{firstName} {lastName} {middleName}</div> 
                       <Link to="/edit/basicInfo" className={styles.editBtn}>Edit Profile</Link>
                    </div>
                    <form>
                    <div className={styles.inputContainer_}>
                      <label>Email</label>
                      <input type="email" value={email} disabled />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Gender</label>
                      <input type="text" value={gender} disabled />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Mobile Number</label>
                      <input type="email" value={mobile} disabled />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Resumption Date</label>
                      <input type="text" value={resumptionDate} disabled/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Position</label>
                      <input type="text" value={position} disabled />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Department</label>
                      <input type="text" value={department} disabled />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>CUG Number</label>
                      <input type="email" value={cugNumber} disabled/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Manager</label>
                      <input type="email" value={manager} disabled/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Location</label>
                      <input type="email" value={location} disabled/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Address</label>
                      <input type="textarea" value={address} disabled />
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default Profile;
