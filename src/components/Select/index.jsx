import * as React from "react";

const Select = ({ onChange, value, title, options, required = false }) => {
  return (
    <div className="hra__InputContainer hra__child">
      <label>{title}</label>
      <select
        onChange={onChange}
        value={value}
        // defaultValue={title}
        required={required}
      >
        {" "}
        <option value="" disabled>
          {title}
        </option>
        {options &&
          options.map((item) => (
            <option value={item.value}>{item.value}</option>
          ))}
      </select>
    </div>
  );
};

export default Select;

export const CustomSelect = ({
  onChange,
  value,
  title,
  options,
  required = false,
}) => {
  return (
    <div className="hra__InputContainer hra__child">
      <label>{title}</label>
      <select
        onChange={onChange}
        value={value}
        // defaultValue={title}
        required={required}
      >
        <option value="" disabled>
          {title}
        </option>
        {options &&
          options.map((item) => <option value={item._id}>{item.value}</option>)}
      </select>
    </div>
  );
};
