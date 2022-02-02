import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const AccountInfo = () => {
    const [bank,setBank] = useState("")
    const [accountNumber,setAccountNumber] = useState("")
    const [accountName ,setAccountName ] = useState("")
    const [bvn,setBvn] = useState("")
    const [nin,setNin] = useState("")
    
    
    const user = "shola"
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar account={styles.remote} />
                    <div className={styles.formContainer}>
                        <form>
                        <div className={styles.inputContainer_}>
                      <label>Bank</label>
                      <input type="date" value={bank} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Account Number</label>
                      <input type="text" value={accountNumber} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Account Name </label>
                      <input type="text" value={accountName } />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>BVN Number</label>
                      <input type="email" value={bvn} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>NIN</label>
                      <input type="textarea" value={nin} />
                    </div>
                        </form>
                    <button className={styles.btn}>Save information</button> <Link to="/edit/profileImage"><div className={styles.btn}>Save information</div></Link> 
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default AccountInfo;
