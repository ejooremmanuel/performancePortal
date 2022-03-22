import React from 'react'
import styles from './styles.module.css'

const Tooltip = ({ children, text, ...rest }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div className={styles.tooltipContainer}>
            <div className={show ? `${styles.tooltipBox} ${styles.visible}` : `${styles.tooltipBox}`}>
                {text}
                <span className={styles.tooltipArrow} />
            </div>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                {...rest}
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip