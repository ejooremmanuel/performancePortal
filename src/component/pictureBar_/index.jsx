import React from 'react';
import styles from "./styles.module.css"
import logo from '../../assets/login.png'
import ProfileImage from '../../screens/profileScreen/profileImage';
function PictureBar() {
  return <div className={styles.pictureBar}>
            <div className={styles.imageContainer}>
                <img src={logo} alt="" />
            </div>
        </div>;
}

export default PictureBar;
