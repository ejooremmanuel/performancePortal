import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css"

function EditNavbar(props) {
  return <div className={styles.navbar}>
         <ul>
             <li className={props.basic}><Link to="/" > Basic Information</Link>  </li>
             <li className={props.emergency} ><Link to="/" > Emergency Contact</Link> </li>
             <li className={props.official}> <Link to="/" >Official Information</Link></li>
             <li className={props.account}><Link to="/"> Account Information </Link></li>
             <li className={props.photo}><Link to="/">Photo Upload</Link></li>
         </ul>
        </div>;
}

export default EditNavbar;
