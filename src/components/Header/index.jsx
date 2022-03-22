import React, { useEffect } from "react";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ title, children, name }) => {
    const navigate = useNavigate()
    const photo = JSON.parse(localStorage.getItem("photo"))

    // const profile = useSelector((state) => state.profile)
    // const { user = "loading...." } = profile

    // useEffect(() => {

    //     if (!user) {

    //         navigate("/")
    //     }
    // }, [navigate, user])
    return (
        <div className={styles.most__header}>
            <div className={styles.most__profile}>
                <div className={styles.most__title}>
                    <h5>{title}</h5>
                </div>
                <div className={styles.most__name}>
                    <h5>Welcome {name}</h5>
                    <div className={styles.dp}><img src={`data:image/jpeg;base64, ${photo}`} alt="DP" /></div>
                </div>
            </div>
            <div className={styles.most__children}>
                {children}
            </div>
        </div>
    );
};

export default Header;
