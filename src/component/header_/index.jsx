import React from 'react';
import styles from "./styles.module.css"
function Header() {
  return( 
        <div className={styles.header}>
          <div className={styles.leftHeader}>
           <div>Edit Profile</div>
            
            </div>
          <div className={styles.rightHeader}>
              <ul>
                {/* <li className={styles.imgContainer}> yes </li>
                <li>user name</li> */}
                <li><button className={styles.orange}>Do you have any suggestion?</button></li>
                <li><button className={styles.purple}>Do you have a complain?</button></li>
              </ul>
          </div> 
        </div>
    );
}

export default Header;
