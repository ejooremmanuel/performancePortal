import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css"

function EditNavbar(props) {
  return <div className={styles.navbar}>
         <ul>
             <li className={props.basic}><Link to= "/edit/basicInfo" > Basic Information</Link>  </li>
             <li className={props.emergency} ><Link to="/edit/emergencyInfo" > Emergency Contact</Link> </li>
             <li className={props.official}> <Link to="/edit/officailInfo" >Official Information</Link></li>
             <li className={props.account}><Link to="/edit/accountInfo"> Account Information </Link></li>
             <li className={props.photo}><Link to="/edit/profileImage" >Photo Upload</Link></li>
         </ul>
        </div>;
}

export default EditNavbar;
