import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header_';
import EditNavbar from '../../component/navigation_';
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const ProfileImage = () => {
    const [profileImage,setProfileImage] = useState("")
    
    
    
    const user = "shola"
  return <div >
        <div> 
            <Header/>
            <div className={styles.layout}>
                <PictureBar/>
                <div className={styles.editContainer}>
                    <EditNavbar photo={styles.remote} />
                    <div className={styles.formContainer}>
                        <form>
                        <input type="file" value={profileImage} />
                        
                        </form>
                        <button className={styles.btn}>Save information</button>
                    </div>
                </div>
            </div>
        </div>
        </div>;
};

export default ProfileImage;
