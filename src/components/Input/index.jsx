import * as React from 'react';


const Input = ({ onChange, value, type, title, readOnly = false, required = false, }) => {
    return <div className="hra__InputContainer hra__child">
        <label>{title}</label>
        <input
            type={type}
            onChange={onChange}
            value={value}
            // placeholder={title}
            readOnly={readOnly}
            required={required}
        />
    </div>;
};

export default Input;