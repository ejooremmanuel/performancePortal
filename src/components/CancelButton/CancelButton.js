import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import "./styles.css";

//@ desc: modal cancel button
//@ return: JSX.Element
//@ param: handleClose(func)
const CancelButton = ({ handleClose }) => {
  return (
    <div onClick={handleClose} className="cancelBtn">
      <FaRegTimesCircle />
    </div>
  );
};

export default CancelButton;
