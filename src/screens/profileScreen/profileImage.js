import React, { useState } from 'react';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const ProfileImage = () => {
    const [profileImage,setProfileImage] = useState("")
    const submitHandler = () =>{
      
    }
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar photo={styles.remote} />
                    <div className={styles.formContainer}>
                        <form onSubmit={submitHandler}>
                        <input type="file" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
                        
                        </form>
                        <button onClick={submitHandler} className={`${styles.btn} ${styles.lilac}`}>Save information</button>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default ProfileImage;
