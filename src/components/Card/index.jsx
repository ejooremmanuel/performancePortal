import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

const Card = ({ title, count, Icon, color, url = "/" }) => {
  return (
    <div className={`${styles.hra__cards}  ${color}`}>
      <Link to={url} className={`${styles.hra__url}`}>
        <div className={styles.hra__text}>
          <h1>{title}</h1>
          <h3>{count}</h3>
        </div>
        <div className={styles.hra__icons}>
          <Icon />
        </div>
      </Link>
    </div>
  );
};

export default Card;
