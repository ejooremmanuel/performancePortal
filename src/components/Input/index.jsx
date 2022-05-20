import * as React from "react";

const Input = ({
  onChange,
  value,
  type,
  title,
  readOnly = false,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="hra__InputContainer hra__child">
      <label>{title}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        // placeholder={title}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
