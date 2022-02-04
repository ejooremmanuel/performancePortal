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
    const submitHandler = () =>{
      
    }
  return <div >
        <div> 
            <Header pageName="Edit Profile"/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar account={styles.remote} />
                    <div className={styles.formContainer}>
                        <form onSubmit={submitHandler}>
                        <div className={styles.inputContainer_}>
                      <label>Bank</label>
                      <select
                        onChange={(e) => setBank(e.target.value)}
                        value={bank}
                      >
                      <option>Select</option>
                        <option value="firstBank">First Bank</option>
                        <option value="Zenith">Zenith bank
                        </option>
                      </select>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Account Number</label>
                      <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>Account Name </label>
                      <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>BVN Number</label>
                      <input type="email" value={bvn} onChange={(e) => setBvn(e.target.value)}/>
                    </div>
                    <div className={styles.inputContainer_}>
                      <label>NIN</label>
                      <input type="textarea" value={nin}  onChange={(e) => setNin(e.target.value)}/>
                    </div>
                        </form>
                        <button onClick={submitHandler} className={`${styles.btn} ${styles.lilac}`}>Save information</button> <Link to="/edit/profileImage"> <div className={`${styles.btn} ${styles.purple}`}>Photo Upload</div></Link> 
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default AccountInfo;
