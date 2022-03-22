import * as React from 'react';


const Textarea = ({ onChange, value, title, required = false }) => {
    return <div className="hra__InputContainer hra__adult">
        <textarea
            onChange={onChange}
            value={value}
            placeholder={title}
            required={required}
        ></textarea>
    </div>;
};

export default Textarea;
