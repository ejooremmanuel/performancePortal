import * as React from 'react';
import styles from './styles.module.css'

const FileUpload = ({ onChange, title, }) => {
    return <div className="hra__InputContainer hra__child">
        <div className={styles.uploadWrapper}>
            <button className={`hra__btn ${styles.uploadBtn}`}>{title}</button>
            <input
                type="file"
                onChange={onChange}

            />
        </div>

    </div>;
};

export default FileUpload;
